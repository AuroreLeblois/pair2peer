const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const db = require('../models/db');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const Wreck= require('@hapi/wreck');
const Update= require('../models/Update.model')
const APIKEY= process.env.APIKEY;
module.exports = {
    name: 'profile pages',
    register: async (server) => {
        await server.register([vision, inert]);

        server.route({
            method: 'GET',
            path: '/update/profile',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'User\'s profile update page',
                tags: ['api', 'profile', 'form']
            },
            handler: async (request, h) => {
                const email= request.state.cookie.email;
                const itLangs= await db.query(`SELECT * FROM all_it_language`);
                const itLang= itLangs.rows;
                const Langs= await db.query(`SELECT * FROM all_language`);
                const Lang= Langs.rows;
                const result = await db.query(`SELECT * FROM usr_profile WHERE email = $1`, [email]);
                const user= result.rows[0];
                console.log(email);
               return  {user, itLang, Lang};
            }
        });
        
        server.route({
            method: 'PATCH',
            path: '/update/profile',
            config: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                validate: {
                    payload: Joi.object({
                        password: Joi.string().allow(''),
                        validatePassword: Joi.ref('password'),
                        pseudo: Joi.string().allow(''),
                        searchable: Joi.boolean().required(),
                        remote: Joi.boolean().required(),
                        city: Joi.string().required(),
                        country: Joi.string().required(),
                        description: Joi.string().allow(''),
                        disponibility: Joi.number(),
                        linkedin_link: Joi.string().allow(''),
                        facebook_link: Joi.string().allow(''),
                        github_link: Joi.string().allow(''),
                        picture:Joi.string()
                    }),
                    options: {
                        // false mean I go through each key (payload) even if one error appears	
                        // true mean the code throw directly an error starting from the first error and doesn't check other key
                        abortEarly: false
                    },
                
              
                failAction: (request, h, err) => {
                        
                    // errors object will be the object who contains all the error messages (in french)
                    const errors = {};
                    const details = err.details;
                    console.log(err.details)
                    // depend on each error, it will write a specific error message
                    let path = details[0].path[0];
                    let typeError = details[0].type;
                        // no need to write a specific error message if the input is empty because the constraint is set on the front side
                        if (path === 'validatePassword' && typeError === 'any.only') {
                            errors[path] = 'Le mot de passe et la confirmation ne correspondent pas';
                        }
                        if(path=== 'city'&& typeError=== 'string.empty'){
                            errors[path]= 'La ville doit être définie'
                        }
                        if(path=== 'city'&& typeError=== 'string.empty'){
                            errors[path]= 'La ville doit être définie'
                        }
                        if(path=== 'country'&& typeError=== 'string.empty'){
                            errors[path]= 'Le pays doit être défini'
                        }
                    
                
                err.output.payload.message = errors;
                        throw err;
            },
        },
                description: 'handle update user profile',
                tags: ['api', 'profile', 'validation']
            },
        
            handler: async (request, h) => {
                //on retrouve l'user de suite pour ne pas avoir à le refaire plus tard
                const me= await User.findOne(request.state.cookie);
                const userID= me.id;
                const userDetails= await db.query(`SELECT * FROM usr_detail WHERE usr_id=$1`,[userID]);
                const userCountry= userDetails.rows[0].country;
                const userCity=userDetails.rows[0].city;
                //les données du formulaire:
                const {password,picture,country, city, remote, 
                    description, validatePassword, pseudo, linkedin_link, 
                    facebook_link, github_link,disponibility} = request.payload;
                    //notre list d'erreur
                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };
                //on compare le mdp avec la validation si mdp changé
                //déjà, est ce que le user a rentré un mdp?
                if(password.length>0){
                    //est ce que le mdp fait bien 8 caractères au moins?
                    if(password.length>=8){
                        //est ce que le mdp ===  validation?
                        if(password===validatePassword){
                            const hashPassword = bcrypt.hashSync(password, 10);
                            await Update.passwordUpdate(hashPassword,userID);
                        }
                        else{
                            errorList.message.errorPassword='La validation et le mot de passe sont différents.';
                        }
                    }
                    else{ errorList.message.errorPassword=' Votre mot de passe doit faire 8 caractères minimum!'};
                };
               //le pseudo si on désire le changer
                if(pseudo.length>0 && pseudo!==me.pseudo){
                    //oui mais le pseudo doit être unique
                    const pseudoExists= await db.query(`SELECT pseudo FROM usr WHERE pseudo= $1;` ,[pseudo]);
                    if(!pseudoExists.rows[0]){
                       await Update.pseudoUpdate(pseudo,userID);
                    }
                    //si le pseudo existe=> on le dit à l'utilisateur
                    else{
                        errorList.message.pseudo="Nom d'utilisateur déjà pris";
                    }
                };
                
                //si l'user change son détail=> usr_detail
                //avant on vérifie que les input "required" sont conformes
                if(city!==null&& country!==null && remote!==null
                  ||city!== undefined&& country!== undefined&& remote!== undefined){

                        const detailExist= await db.query(`SELECT * FROM usr_detail WHERE usr_id=$1`,[userID]);
                        //il n'existe pas=> on insert
                         if(!detailExist.rows[0]){
                        //ensuite on vérifie si ce qui a été saisie diffère des données existantes
                        if(city!==userCity &&country!==userCountry
                        ||country==userCountry&& city!==userCity
                        ||city==userCity&&country!==userCountry){

                        const api= await Wreck.get(`https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}&apiKey=${APIKEY}`,{
                            json:true
                        });
                        const latitude= api.payload.items[0].position.lat;
                        const longitude= api.payload.items[0].position.lng;
                        await Update.detailInsert(city, country, remote,latitude, longitude, disponibility, userID,description, linkedin_link, facebook_link,github_link);
                        }         
                    }//sinon on update
                    else{
                        if(city!==userCity &&country!==userCountry
                            ||country==userCountry&& city!==userCity
                            ||city==userCity&&country!==userCountry){
        
                            const api= await Wreck.get(`https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}&apiKey=${APIKEY}`,{
                                json:true
                            });
                            const latitude= api.payload.items[0].position.lat;
                            const longitude= api.payload.items[0].position.lng;
                            await Update.localisationUpdate(city,country,latitude,longitude,userID);
                            }
                            if(city===null||city===undefined){
                                errorList.message.city=`Il vous faut définir votre ville`;
                            }
                            if(country===null||country===undefined){
                               errorList.message.country=`Merci de définir votre pays`;
                            }
                            if(remote===null||remote===undefined){
                               errorList.message.remote=`Merci de nous dire si vous souhaitez travailler en remote`;
                            }
                            if (errorList.message.errorEmail
                                ||errorList.message.errorPassword
                                ||errorList.message.city
                                ||errorList.message.country
                                ||errorList.message.remote
                                ||errorList.message.pseudo) {
                                return errorList;
                            }
                             await Update.detailUpdate(remote, description, disponibility,linkedin_link,facebook_link,github_link, picture,userID)
                        };
                    
                    }
                   
                            const newResult = await db.query(`SELECT * FROM usr WHERE "id" = $1` ,[userID]);
                            const newProfile= await db.query(`SELECT * FROM usr_profile WHERE pseudo=$1 `,[newResult.rows[0].pseudo]);
                            // const newPlace= await db.query(`SELECT * FROM usr_map WHERE pseudo=$1`, [newResult.rows[0].pseudo]);
                            // const newPl= newPlace.rows[0];
                            const newPro= newProfile.rows[0];
                            return  {newPro};
                        
                    }
                
                });

                server.route({
                    method: 'PATCH',
                    path: '/profile/languages',
                    options: {
                        auth: {
                            strategy: 'base',
                            mode: 'required',
                            scope: ['user', 'admin']
                        },
                        validate: {
                            payload: Joi.object({
                                language: Joi.string(),
                              
                            }),
                        },

                        description: 'handle update user profile lang',
                         tags: ['api', 'profile', 'validation']
            },
                    handler: async (request, h) => {
                        //les langues
                        const email= request.state.cookie.email;
                        const result = await db.query(`SELECT * FROM usr WHERE email = $1`,[email] );
                        const userID= result.rows[0].id;
                        const language=request.payload.language;
                        const langExists= await db.query(`SELECT * 
                                                          FROM lang
                                                          WHERE "name" =$1`, [language]);
                        const langID= langExists.rows[0].id;
                        const userKnowsLang= await db.query(`SELECT usr_id, lang_id 
                                                            FROM usr_speaks_lang
                                                            WHERE usr_id = $1 AND lang_id= $2`,[userID, langID]);
                                                           
                        if(!userKnowsLang.rows[0]){
                        await Update.insertLang(userID,langID);
                        }
                        const newUser=await db.query(`SELECT * FROM usr_profile WHERE id=$1`,[userID]);
                        return newUser.rows;
                    }
                });
                    
                 server.route({
                    method: 'DELETE',
                    path: '/profile/languages/{language}',
                    options: {
                        auth: {
                            strategy: 'base',
                            mode: 'required',
                            scope: ['user', 'admin']
                        },
                        validate: {
                            params: Joi.object({
                                language: Joi.string(),
                              
                            }),
                        },  
                        description: 'handle delete user profile lang',
                        tags: ['api', 'profile', 'delete']
                    },
                        handler: async (request, h) => {
                            const email= request.state.cookie.email;
                            const result = await db.query(`SELECT * FROM usr WHERE email = $1`,[email] );
                            const userID= result.rows[0].id;
                            const language=request.params.language;
                                const langExists= await db.query(`SELECT * 
                                                        FROM lang
                                                        WHERE "name" =$1;`, [language]);
                            const langID= langExists.rows[0].id;
                            await Update.deleteLang(userID,langID);
                            const newUser=await db.query(`SELECT * FROM usr_profile 
                                                            WHERE id=$1;`,[userID]);
                            return newUser.rows;
                        }
                    
                });

                server.route({
                    method: 'PATCH',
                    path: '/profile/it_languages',
                    options: {
                        auth: {
                            strategy: 'base',
                            mode: 'required',
                            scope: ['user', 'admin']
                        },
                        validate: {
                            payload: Joi.object({
                               
                                it_language: Joi.array().items(Joi.object({
                                    name: Joi.string(),
                                    level: Joi.number().min(0).max(10),
                                    search: Joi.boolean()
                                    }))
                            }),
                        },

                        description: 'handle update user profile it-lang',
                tags: ['api', 'profile', 'validation']
            },
            handler: async (request, h) => {
                const email= request.state.cookie.email;
                const result = await db.query(`SELECT * FROM usr WHERE email = $1`,[email] );
                const userID= result.rows[0].id;
                const it_language= request.payload.it_language;      
                const itLangExists = await db.query(`SELECT *
                                                    FROM it_lang
                                                    WHERE "name"=$1;`, [it_language[0].name]);

                const itLangID= itLangExists.rows[0].id;
                const userKnowsIt= await db.query(`SELECT usr_id, it_lang_id 
                                                    FROM usr_knows_it_lang
                                                    WHERE usr_id = $1 
                                                    AND it_lang_id= $2`,
                                                    [userID, itLangID]);
            
                if(!userKnowsIt.rows[0]){
                     await Update.insertIT(userID, itLangID, it_language[0].level, it_language[0].search)
                }
                else{
                    await Update.updateIT(it_language[0].level, it_language[0].search,userID, itLangID)
                }
                    
                const newUser=await db.query(`SELECT * FROM usr_profile WHERE id=$1`,[userID]);
                return newUser.rows;
                }
           
                });


                server.route({
                    method: 'DELETE',
                    path: '/profile/it_languages/{it_language}',
                    options: {
                        auth: {
                            strategy: 'base',
                            mode: 'required',
                            scope: ['user', 'admin']
                        },
                        validate: {
                            params: Joi.object({
                                it_language: Joi.string(),
                            }),
                        },
                        description: 'handle delete user profile it-lang',
                        tags: ['api', 'profile', 'deletion']
                    },

                        handler: async (request, h) => {
                            const email= request.state.cookie.email;
                            const it_language= request.params.it_language;
                            const result = await db.query(`SELECT * FROM usr 
                                                            WHERE email = $1`,
                                                            [email] );

                            const userID= result.rows[0].id;
                    
                            const itLangExists = await db.query(`SELECT *
                                                                FROM it_lang
                                                                WHERE "name" = $1`, 
                                                                [it_language]);
                                              
                            const itLangID= itLangExists.rows[0].id;
              
                            await Update.deleteIT(userID,itLangID);
                            const newUser=await db.query(`SELECT * FROM usr_profile 
                                                        WHERE id=$1`,
                                                        [userID]);
                            return newUser.rows;
                        }
                    });
                
                }
            }
        
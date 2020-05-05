const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const db = require('../models/db');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const Wreck= require('@hapi/wreck');
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
            options: {
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
                        firstEmail: Joi.string().email().required(),
                        email: Joi.string().email().allow(''),
                        validateEmail: Joi.string().email().allow(''),
                        searchable: Joi.boolean().required(),
                        remote: Joi.boolean().required(),
                        city: Joi.string().required(),
                        country: Joi.string().required(),
                        birthyear: Joi.number().allow(''),
                        description: Joi.string().allow(''),
                        experience: Joi.number().allow(''),
                        disponibility: Joi.number(),
                        linkedinLink: Joi.string().allow(''),
                        // languages: Joi.array().items(Joi.string()),
                        // itLang: Joi.string().items(Joi.string())
                    })
                },
                description: 'handle update user profile',
                tags: ['api', 'profile', 'validation']
            },
            handler: async (request, h) => {
                //grosse fonction update en perspective=> tout ce dont on a besoin
                //un tableau d'erreurs vide
                let error= [];
                //le cookie email pour retrouver l'user
                // const email= request.state.cookie.email;
                const email= request.payload.firstEmail;
                console.log(email);
                //on retrouve l'user de suite pour ne pas avoir à le refaire plus tard
                const result = await db.query(`SELECT * FROM usr WHERE email = $1`,[email] );
                console.log(`user trouvé!`)
                const userID= result.rows[0].id;
                console.log(userID)
                const userDetails= await db.query(`SELECT * FROM usr_detail WHERE usr_id=$1`,[userID]);
                console.log(`detail trouvé`)
                const userCountry= userDetails.rows[0].country;
                const userCity=userDetails.rows[0].city;
                //les données du formulaire:
                //les données utilisateur brutes
                const password= request.payload.password;
                const birthyear= request.payload.birthyear;
                const picture= request.payload.picture;
                const country= request.payload.country;
                const city= request.payload.city;
                const remote= request.payload.remote;
                const experience= request.payload.experience;
                const description= request.payload.description;
                const validatePassword= request.payload.validatePassword;
                const changeMyEmail= request.payload.email;
                const validateEmail= request.payload.validateEmail;
                const pseudo= request.payload.pseudo;
                const linkedinLink=request.payload.linkedinLink;
                //les langues
                const selectedLang= [request.payload.languages];
                //les it
                const itlangs = [request.payload.itLanguages];
                const itLevel= [request.payload.itLevels];
                //on peut me trouver via le filtre?
                const searchMe= request.payload.searchable;
                //les dispos
                const disponibility= request.payload.disponibility;
                
                //petit console.log(request.payload) pour vérifier tout ça
                console.log(request.payload);
                //si l'utisateur change des infos=> update user table
                //le pseudo
                
                //le mot de passe
                //on compare le mdp avec la validation si mdp changé
                //déjà est ce que le user a rentré un mdp?
                if(password!== null
                    ||password!== undefined
                    ||password.length>0){
                    console.log('un mot de passe a été saisie!')
                    //est ce que le mdp fait bien 8 caractères au moins?
                    if(password.length>=8){
                        console.log('le mdp est supérieur à 8 caractères')
                        //est ce que le mdp ===  validation?
                        if(password===validatePassword){
                            console.log('le mdp est le meme que la validation')
                            const hashPassword = bcrypt.hashSync(password, 10);
                            await db.query(`UPDATE usr
                                            SET "password"= ${hashPassword} 
                                            WHERE "id"=${userID}`);
                        }
                        else{
                            error.push('La validation et le mot de passe sont différents.');
                        }
                    }
                    else{error.push(' Votre mot de passe doit faire 8 caractères minimum!')};
                };
                //l'email
                //est-ce que le champs email est rempli et différent du cookie?
                if(changeMyEmail!== null
                    ||changeMyEmail!== undefined
                    ||changeMyEmail.length>0
                    ||changeMyEmail!==email&& changeMyEmail===validateEmail){
                    console.log('un email a été saisie et est différent+validation ok')
                    //ok mais c'est un email?
                    if(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(changeMyEmail)===true){
                    //dans ce cas on va update le profil
                    console.log(`c'est bien un email`)
                    await db.query(`UPDATE usr 
                                    SET "email"=$1 
                                    WHERE usr.id=$1`, [changeMyEmail, userID]);
                    }
                    //sinon on prévient l'user
                    else{
                        error.push(`L'email saisie est invalide ou n'est pas équivalent à la validation.`);
                    }
                };
               
                
                //si l'user change son détail=> usr_detail
                //avant on vérifie que les input "required" sont conformes
                if(city!==null&& country!==null && remote!==null
                    ||city!== undefined&& country!== undefined&& remote!== undefined){
                        console.log(`attention je rentre dans la vérification de la ville et du pays`)
                    //ensuite on vérifie si ce qui a été saisie diffère des données existantes
                    if(city!==userCity &&country!==userCountry
                        ||country==userCountry&& city!==userCity
                        ||city==userCity&&country!==userCountry){
                            console.log(`je lance la requete vers l'api`)
                        const api= await Wreck.get(`https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}&apiKey=${APIKEY}`,{
                            json:true
                        });
                        console.log(`j'ai vérifié la requête à l'api`)
                        const latitude= api.payload.items[0].position.lat;
                        console.log(latitude);
                        const longitude= api.payload.items[0].position.lng;
                        console.log(longitude);
                        const detailExist= await db.query(`SELECT * FROM usr_detail WHERE usr_id=$1`,[userID]);
                        //il n'existe pas=> on insert
                         if(!detailExist.rows[0]){
                             console.log(`je n'ai pas trouvé de correspondance=>j'insère`)
                             await db.query(`INSERT INTO usr_detail ("city", "country", "remote", usr_id, "birthyear", picture, description, experience, latitude, longitude, disponibility, linkedin_link)
                                            VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7, $8, $9, $10, $11,$12);`
                                            ,[city, country, remote, userID, birthyear, picture, description,experience, latitude, longitude, disponibility, linkedinLink]);
                    }//sinon on update
                         else{
                             console.log(`j'ai trouvé une correspondance=>j'update`)
                             await db.query(`UPDATE usr_detail
                                            SET "city"=$1 , 
                                            "country"=$2 ,
                                            "remote"=$3 ,
                                            "birthyear"=$4 ,
                                            picture= $5 ,
                                            description=$6 ,
                                            experience=$7,
                                            latitude=$8,
                                            longitude=$9,
                                            disponibility=$10,
                                            linkedin_link=$11
                                            WHERE usr_id=$1`,
                                            [city, country, remote, birthyear,
                                            picture, description, experience, latitude, longitude,disponibility,linkedinLink,userID]);
                                            console.log(`update usr_detail ok`)
                                        };
                    
                    }
                  
                   
                    
                }
            //sinon on dit ce qu'il manque à l'utilisateur
                else{
                    if(city===null||city===undefined){
                        error.push(`Il vous faut définir votre ville`);
                    }
                    if(country===null||country===undefined){
                        error.push(`Merci de définir votre pays`);
                    }
                    if(remote===null||remote===undefined){
                        error.push(`Merci de nous dire si vous souhaitez travailler en remote`);
                    }
                }
            


                //si l'utilisateur rentre une langue
                if(selectedLang.length >0){
                    console.log(`il y a des langues`)
                    for (let lang of selectedLang){
                        const langExists= await db.query(`SELECT id 
                                                      FROM lang
                                                      WHERE "name" LIKE $1`, [lang]);
                        const langID= langExists.rows[0].id;
    
                        const userKnowsLang= await db.query(`SELECT usr_id, lang_id 
                                                            FROM usr_speaks_lang
                                                            WHERE user_id = $1 AND lang_id= $2`,[userID, langID]);
                        if(!userKnowsLang.rows[0]){
                        await db.query(`INSERT INTO usr_speaks_lang (user_id, lang_id) 
                        VALUES ($1, $2)`,[userID,langID]);
                        }
                    }
                    
                };
                //si l'utilisateur entre un it langage => insert//update user knows it lang
                if(itLangs.length>0){
                    for (let itLang of itLangs){
                    
                        const itLangExists = await db.query(`SELECT id 
                                                        FROM it_lang
                                                        WHERE "name" LIKE $1`, [itLang]);
                        const itLangID= itLangExists.rows[0].id;
    
                        const userKnowsIt= await db.query(`SELECT usr_id, it_lang_id 
                                                           FROM usr_knows_it_lang
                                                           WHERE user_id = $1 
                                                           AND it_lang_id= $2`,
                                                           [userID, itLangID]);
                        //si pas de résultat
                        if(!userKnowsIt.rows[0]){
                            await db.query(`INSERT INTO usr_knows_it_lang (usr_id, it_lang_id, "level", search) 
                            VALUES ($1, $2, $3, $4)`,
                            [userID, itLangID, itLevel, searchMe]);
                        }
                        //si résultat
                        else{
                            await db.query(`UPDATE usr_knows_it_lang 
                                            SET "level"= $1, search= $2
                                            WHERE usr_id=$1
                                            AND it_lang_id =$2`,
                                            [itLevel,searchMe, userID,itLangID]);

                        }
                    }
                    };
                    if(pseudo!== undefined
                        ||pseudo!== null
                        ||pseudo.length>3 && pseudo.toLowerCase()!==result.rows[0].pseudo
                        ||!!pseudo){
                           
                        //oui mais le pseudo doit être unique
                        console.log(`je rentre dans la vérification du pseudo`);
                        const pseudoExists= await db.query(`SELECT pseudo FROM usr WHERE pseudo= $1;` ,[pseudo]);
                        if(!pseudoExists.rows[0]){
                            console.log(`aucun pseudo équivalent`);
                            await db.query(`UPDATE usr SET pseudo=${pseudo} WHERE "id"=$2;`,[userID]);
                            console.log(`j'ai update le pseudo`);
                        }
                        //si le pseudo existe=> on le dit à l'utilisateur
                        else{
                            error.push('Désolé...Ce pseudo est déjà pris! ');
                        }
                    };
                        //si il y a des erreurs
                        // if(error.length>0){
                        //     return h.response(error).code(400);
                        // }
                        //sinon on renvoie les nouvelles infos
                        // else{
                            const newResult = await db.query(`SELECT * FROM usr WHERE "id" = $1` ,[userID]);
                            const newProfile= await db.query(`SELECT * FROM usr_profile WHERE pseudo=$1 `,[newResult.rows[0].pseudo]);
                            const newPlace= await db.query(`SELECT * FROM usr_map WHERE pseudo=$1`, [newResult.rows[0].pseudo]);
                            return  {newPlace, newProfile};
                        // }
                        //si le champs est vide=> ne rien faire
                    }
                });

               //to do:rangement

            }
        }
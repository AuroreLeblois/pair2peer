const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const db = require('../models/db');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'profile pages',
    register: async (server) => {
        await server.register([vision, inert]);

        server.route({
            method: 'GET',
            path: '/update/profile',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: ['user', 'admin']
                // },
                description: 'User\'s profile update page',
                tags: ['api', 'profile', 'form']
            },
            handler: async (request, h) => {
                const email= request.state.cookie.email;
                const result = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
                const user= result.rows[0];
               return  user;
            }
        });
        
        server.route({
            method: 'PATCH',
            path: '/update/profile',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: ['user', 'admin']
                // },
                validate: {
                    payload: Joi.object({
                        password: Joi.string(),
                        validatePassword: Joi.ref('password'),
                        pseudo: Joi.string(),
                        email: Joi.string().email({ minDomainSegments: 2}),
                        searchable: Joi.boolean().required(),
                        remote: Joi.boolean().required(),
                        city: Joi.string().required(),
                        country: Joi.string().required(),
                        birthyear: Joi.number(),
                        description: Joi.string(),
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
                const email= request.state.cookie.email;
                //on retrouve l'user de suite pour ne pas avoir à le refaire plus tard
                const result = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
                const userID= result.rows[0].id;
                //les données du formulaire
                let password= request.payload.password;
                let birthyear= request.payload.birthyear;
                let picture= request.payload.picture;
                let country= request.payload.country;
                let city= request.payload.city;
                let remote= request.payload.remote;
                let experience= request.payload.experience;
                let description= request.payload.description;
                let validatePassword= request.payload.validatePassword;
                let changeMyEmail= request.payload.email;
                let speudo= request.payload.speudo;
                let selectedLang= [request.payload.languages];
                let itlangs = [request.payload.itLanguages];
                let itLevel= [request.payload.itLanguages.itLevels];
                let searchMe= request.payload.searchable;
                
                //si l'utisateur change des infos=> update user table
                //le speudo
                if(speudo!== undefined||speudo!== null||speudo.lenght>0){
                    //oui mais le speudo doit être unique
                    speudoExists= await db.query(`SELECT speudo FROM usr WHERE speudo=${speudo}`);
                    if(!speudoExists.rows[0]){
                    await db.query(`UPDATE usr SET speudo= ${speudo} WHERE usr.id=${userID}`);
                    }
                    //si le speudo existe=> on le dit à l'utilisateur
                    else{
                        error.push('Désolé...Ce speudo est déjà pris! ');
                    }
                };
                //le mot de passe
                //on compare le mdp avec la validation si mdp changé
                //déjà est ce que le user a rentré un mdp?
                if(password!== null||password!== undefined||password.lenght>0){
                    //est ce que le mdp fait bien 8 caractères au moins?
                    if(password.lenght>=8){
                        //est ce que le mdp ===  validation?
                        if(password===validatePassword){
                            await db.query(`UPDATE usr
                                            SET "password"= ${password} 
                                            WHERE usr.id=${userID}`);
                        }
                        else{
                            error.push('La validation et le mot de passe sont différents.');
                        }
                    }
                    else{error.push(' Votre mot de passe doit faire 8 caractères minimum!')};
                };
                //l'email
                //est-ce que le champs email est rempli et différent du cookie?
                if(changeMyEmail!== null||changeMyEmail!== undefined||changeMyEmail.lenght>0||changeMyEmail!==email){
                    //ok mais c'est un email?
                    if(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(changeMyEmail)===true){
                    //dans ce cas on va update le profil
                    await db.query(`UPDATE usr 
                                    SET "email"=${changeMyEmail}
                                    WHERE usr.id=${userID}`)
                    }
                    //sinon on prévient l'user
                    else{
                        error.push(`L'email saisie est invalide.`)
                    }
                };
                
                //si l'user change son détail=> usr_detail
                //avant on vérifie que les input sont conformes
                if(city!==null&& country!==null && remote!==null){
                //si le detail n'existe pas encore il faut les créer
                    const detailExist= await db.query(`SELECT * FROM usr_detail WHERE usr_id=${userID}`);
                //il n'existe pas=> on insert
                     if(!detailExist.rows[0]){
                         await db.query(`INSERT INTO usr_detail ("city", "country", "remote", usr_id)
                                        VALUES (${city}, ${country}, ${remote}, ${userID})`)
                }
                //sinon on update
            }
            //sinon on dit ce qu'il manque à l'utilisateur
            else{
                if(city===null||city===undefined){
                    error.push(`Il vous faut définir votre ville`)
                }
                if(country===null||country===undefined){
                    error.push(`Merci de définir votre pays`)
                }
                if(remote===null||remote===undefined){
                    error.push(`Merci de nous dire si vous souhaitez travailler en remote`)
                }
            }


                //si l'utilisateur rentre une langue (insert user knows lang)
                if(selectedLang.lenght >0){
                    for (let lang of selectedLang){
                        const langID= await db.query(`SELECT id 
                                                      FROM lang
                                                      WHERE "name" LIKE %$1`, [lang]);
    
                        const userKnowsLang= await db.query(`SELECT usr_id, lang_id 
                                                            FROM usr_speaks_lang
                                                            WHERE user_id = ${userID} AND lang_id= ${langID}`);
                        if(!userKnowsLang){
                        await db.query(`INSERT INTO usr_speaks_lang (user_id, lang_id) 
                        VALUES (${userID}, ${langID})`);
                        }
                    }
                    
                };
                //si l'utilisateur entre un it langage => insert//update user knows it lang
                if(itLangs.lenght>0){
                    for (let itLang of itLangs){
                    
                        const itLangID = await db.query(`SELECT id 
                                                        FROM it_lang
                                                        WHERE "name" LIKE %$1`, [itLang]);
    
                        const userKnowsIt= await db.query(`SELECT usr_id, it_lang_id 
                                                           FROM usr_knows_it_lang
                                                           WHERE user_id = ${userID} 
                                                           AND it_lang_id= ${itLangID}`);
                        //si pas de résultat
                        if(!userKnowsIt){
                            await db.query(`INSERT INTO usr_knows_it_lang (usr_id, it_lang_id, "level", search) 
                            VALUES (${userID}, ${itLangID}, ${itLevel}, ${searchMe})`);
                        }
                        //si résultat
                        else{
                            await db.query(`UPDATE usr_knows_it_lang 
                            SET "level"= ${itLevel}, search= ${searchMe})
                            WHERE usr_id=${userID} 
                            AND it_lang_id ${itLangID}`);
                        }
                    }
                }
                //si le champs est vide=> ne rien faire
                const user= result.rows[0];
                return  {user};
         
            }
        });

    }
}
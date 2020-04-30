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
                //les données du formulaire:
                //les données utilisateur brutes
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
                let validateEmail= request.payload.validateEmail;
                let pseudo= request.payload.pseudo;
                //les langues
                let selectedLang= [request.payload.languages];
                //les it
                let itlangs = [request.payload.itLanguages];
                let itLevel= [request.payload.itLanguages.itLevels];
                //on peut me trouver via le filtre?
                let searchMe= request.payload.searchable;
                //les dispo
                let days= [request.payload.disponibilityDays];
                let startSession= request.payload.hourSessionStart;
                let stopSession= request.payload.hourSessionStop;
                
                //petit console.log(request.payload) pour vérifier tout ça
                console.log(request.payload);
                //si l'utisateur change des infos=> update user table
                //le speudo
                if(pseudo!== undefined||pseudo!== null||pseudo.length>0 && pseudo!==result.rows[0].speudo){
                    //oui mais le speudo doit être unique
                    pseudoExists= await db.query(`SELECT speudo FROM usr WHERE speudo=${speudo}`);
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
                if(password!== null||password!== undefined||password.length>0){
                    console.log('un mot de passe a été saisie!')
                    //est ce que le mdp fait bien 8 caractères au moins?
                    if(password.length>=8){
                        console.log('le mdp est supérieur à 8 caractères')
                        //est ce que le mdp ===  validation?
                        if(password===validatePassword){
                            console.log('le mdp est le meme que la validation')
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
                if(changeMyEmail!== null||changeMyEmail!== undefined||changeMyEmail.length>0||changeMyEmail!==email&& changeMyEmail===validateEmail){
                    console.log('un email a été saisie et est différent+validation ok')
                    //ok mais c'est un email?
                    if(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(changeMyEmail)===true){
                    //dans ce cas on va update le profil
                    await db.query(`UPDATE usr 
                                    SET "email"=${changeMyEmail}
                                    WHERE usr.id=${userID}`)
                    }
                    //sinon on prévient l'user
                    else{
                        error.push(`L'email saisie est invalide ou n'est pas équivalent à la validation.`)
                    }
                };
                
                //si l'user change son détail=> usr_detail
                //avant on vérifie que les input "required" sont conformes
                if(city!==null&& country!==null && remote!==null||city!== undefined&& country!== undefined&& remote!== undefined){
                    //si le detail n'existe pas encore il faut les créer
                    const detailExist= await db.query(`SELECT * FROM usr_detail WHERE usr_id=${userID}`);
                    //il n'existe pas=> on insert
                     if(!detailExist.rows[0]){
                         await db.query(`INSERT INTO usr_detail ("city", "country", "remote", usr_id,birthyear, picture, decription, experience)
                                        VALUES (${city}, ${country}, ${remote}, ${userID}, ${birthyear}, ${picture}, ${description}, ${experience})`)
                }
                //sinon on update
                        else{
                            await db.query(`UPDATE usr_detail
                                            SET "city"=${city}, 
                                            "country"=${country},
                                            "remote"=${remote},
                                            birthyear=${birthyear},
                                            picture= ${picture},
                                            description=${description},
                                            experience=${experience}
                                            WHERE usr_id=${userID}`);
                        };
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
            


                //si l'utilisateur rentre une langue (insert user knows lang)
                if(selectedLang.length >0){
                    for (let lang of selectedLang){
                        const langID= await db.query(`SELECT id 
                                                      FROM lang
                                                      WHERE "name" LIKE $1`, [lang]);
    
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
                if(itLangs.length>0){
                    for (let itLang of itLangs){
                    
                        const itLangID = await db.query(`SELECT id 
                                                        FROM it_lang
                                                        WHERE "name" LIKE %$1`, [itLang]);
    
                        const userKnowsIt= await db.query(`SELECT usr_id, it_lang_id 
                                                           FROM usr_knows_it_lang
                                                           WHERE user_id = ${userID} 
                                                           AND it_lang_id= ${itLangID}`);
                        //si pas de résultat
                        if(!userKnowsIt.rows[0]){
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
                    };
                
                //diponibility
                //est ce que j'ai sélectionné des jours?
                if(days.length>0){
                    //la dispo existe?
                    for(let day of days){
                        
                   const dispoExists= await db.query(`SELECT * 
                                                    FROM disponibility
                                                    WHERE usr_id=${userID}
                                                    AND day=${day}`);
                    //non
                    if(!dispoExists.rows[0]){
                        //pour chaque jour=>insert du jour pour créer la ligne
                            await db.query(`INSERT INTO disponibility(day, usr_id)
                                            VALUES (${day}, ${userID})`)
                         
                         if(startSession!==null||startSession!==undefined||startSession!==isNaN(startSession)){
                            //l'user a rentré une fin?
                                if(stopSession!==null||stopSession!==undefined||stopSession!==isNaN(stopSession)){
                                    let interval= stopSession-startSession;
                                    const intervalSession= interval+'H';
                                }
                            }
                        }
                    }
                    //et si aucune case n'est cochée=> user ne veut plus faire de session donc... plus dispo
                }else{
                    //on select les rows du user
                    const dispoExists= await db.query(`SELECT * 
                                                    FROM disponibility
                                                    WHERE usr_id=${userID}
                                                    `);
                    //si on trouve des correspondances on les supprime
                    if(dispoExists.rows[0]){
                        await db.query(`DELETE * 
                                        FROM disponibility
                                        WHERE usr_id=${userID}`)
                    }
                }
                

                        //si il y a des erreurs
                        if(error.length>0){
                            return error
                        }
                        //sinon on renvoie les nouvelles infos
                        else{
                            const newResult = await db.query(`SELECT * FROM usr WHERE id = ${userID}`);
                            const newProfile= await db.query(`SELECT * FROM usr_profile WHERE usr.pseudo=${newResult.rows[0].pseudo}`);
                            const newPlace= await db.query(`SELECT * FROM usr_map WHERE usr.pseudo=${newResult.rows[0].pseudo}`)
                            return  {newPlace, newProfile};
                        }
                        //si le champs est vide=> ne rien faire
                    }
                });

               

            }
        }

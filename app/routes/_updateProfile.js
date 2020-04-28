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
               return  {user};
         
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
                description: 'handle update user profile',
                tags: ['api', 'profile', 'validation']
            },
            handler: async (request, h) => {
                const email= request.state.cookie.email;
                let selectedLang= request.payload.language;
                //it_lang à défénir TODO
                let itlangs = request.payload.something;
                let itLevel= request.payload.somethingLevel;
                let searchMe= request.payload.boolean;
                const result = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
                let userID= result.rows[0].id;
                //si l'utisateur change des infos=> update user table
                //si l'user change son détail=> usr_detail
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
                    
                }
                //si l'utilisateur entre un langage => insert//update user knows it lang
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
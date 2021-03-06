const db = require('../models/db');
const Joi = require('@hapi/joi');
const Admin = require('../models/Admin.model');

module.exports = {
    name: 'admin pages',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/admin',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: 'admin'
                },
                description: 'Admin\'s page',
                tags: ['api', 'admin']
            },
            handler: async (request, h) => {

                // send basic informations to the front
                const language = await db.query('SELECT * FROM all_language');
                const it_language = await db.query('SELECT * FROM all_it_language');

                const info = {};
                info.language = language.rows[0].name;
                info.it_language = it_language.rows[0].name;

                return info;
            }
        });

        server.route({
            method: 'POST',
            path: '/admin',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: 'admin'
                },
                description: 'Target\'s admin page to add language or it_language',
                tags: ['api', 'admin'],
                validate: {
                    payload: Joi.object({
                        language: Joi.string().trim().allow(''),
                        it_language: Joi.string().trim().allow('')
                    })
                }
            },
            handler: async (request, h) => {

                // use Admin model to add language or it_language
                const info = await Admin.add(request.payload);

                return info;
            }
        });

        server.route({
            method: 'GET',
            path: '/admin/lang/{langName}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: 'admin'
                },
                validate: {
                    params: Joi.object({
                        langName: Joi.string().required()
                    })
                },
                description: 'Admin\'s page for update lang',
                tags: ['api', 'admin', 'lang']
            },
            handler: async(request, h) => {

                // send basic informations to the front
                const langName = request.params.langName; 
                const language = await db.query('SELECT "id" FROM lang WHERE "name"=$1',[langName]);

                const lang = language.rows[0];

                return lang;
            }
        });

        server.route({
            method: 'PATCH',
            path: '/admin/lang/{langName}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: 'admin'
                },
                validate: {
                    payload: Joi.object({ 
                        language: Joi.string().required(), 
                    }),
                    params: Joi.object({
                        langName: Joi.string().required()
                    })
                },
                description: 'handle update lang',
                tags: ['api', 'language', 'update']
            },
            handler: async (request, h) => {
                //on récupère ce qu'il nous faut
                const langName= request.params.langName;
                const language= request.payload.language;
                const ToUpdates= await db.query(`SELECT "id" FROM lang WHERE "name"=$1`,[langName]);
                const ToUpdate= ToUpdates.rows[0].id;
                if(ToUpdate){
                    await db.query(`UPDATE lang SET "name"=$1 WHERE "id"=$2`,[language, ToUpdate]);
                }else{
                    const message="Je n'ai pas trouvé de correspondance, impossible de mettre à jour"
                    return message
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/admin/lang/{langName}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['admin']
                },
                validate: {
                    params: Joi.object({
                        langName: Joi.string().required()
                    })
                },
                description: 'handle delete lang',
                tags: ['api', 'language', 'delete']
            },
            handler: async (request, h) => {
                //on récupère ce qu'il nous faut
                const langName= request.params.langName;
                await db.query(`DELETE FROM lang WHERE "name"=$1`,[langName]);
                return 'langue supprimée'
            }
        });

        server.route({
            method: 'GET',
            path: '/admin/itlang/{it_lang}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: 'admin'
                },
                validate: {
                    params: Joi.object({
                        it_lang: Joi.string().required()
                    })
                },
                description: 'Admin\'s page for update it_lang',
                tags: ['api', 'admin', 'it_lang']
            },
            handler:async (request, h) => {
                // send basic informations to the front
                const ITLang = request.params.it_lang; 
                const it_lang = await db.query('SELECT "id","name" FROM it_lang WHERE "name"=$1',[ITLang]);

                const iTLanguage = it_lang.rows[0];

                return iTLanguage;
            }
        });

        server.route({
            method: 'PATCH',
            path: '/admin/itlang/{it_lang}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['admin']
                },
                validate: {
                    payload: Joi.object({ 
                        it_language: Joi.string().required(), 
                    }),
                    params: Joi.object({
                        it_lang: Joi.string().required()
                    })
                },
                description: 'handle update it_lang',
                tags: ['api', 'admin','it_lang', 'update']
            },
            handler: async (request, h) => {
                //on récupère ce qu'il nous faut
                const ITLang= request.params.it_lang;
                const it_language= request.payload.it_language;
                const ToUpdates= await db.query(`SELECT "id" FROM it_lang WHERE "name"=$1`,[ITLang]);
                const ToUpdate= ToUpdates.rows[0].id;

                if(!ToUpdate){
                    const message="Je n'ai pas trouvé de correspondance, impossible de mettre à jour"
                    return message;
                   
                }else{
                    await db.query(`UPDATE it_lang SET "name"=$1 WHERE "id"=$2`,[it_language, ToUpdate]);
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/admin/itlang/{it_lang}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['admin']
                },
                validate: {
                    params: Joi.object({
                        it_lang: Joi.string().required()
                    })
                },
                description: 'handle delete lang',
                tags: ['api', 'language', 'delete']
            },
            handler: async (request, h) => {
                //on récupère ce qu'il nous faut
                const itLang= request.params.it_lang;
                await db.query(`DELETE FROM it_lang WHERE "name"=$1`,[itLang]);
                return 'it_lang supprimé'
            }
        });

    }
}
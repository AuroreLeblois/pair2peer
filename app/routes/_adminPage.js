const db = require('../models/db');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'admin pages',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/admin',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: 'admin'
                // },
                description: 'Admin\'s page',
                tags: ['api', 'admin']
            },
            handler: (request, h) => {

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
            method : 'POST',
            path: '/admin',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: 'admin'
                // },
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

                const query = request.payload;

                let language = await db.query('SELECT * FROM all_language');
                let it_language = await db.query('SELECT * FROM all_it_language');

                // if key doesn't have any value, the pair key-value will be remove of the object
                for (let item in query) {
                    if (!query[item]) {
                        delete query[item]
                    }
                } 

                const keys = Object.keys(query);
                const values = Object.values(query);

                // depend to the query, it will insert the value
                for (let index = 0; index < keys.length; index++) {
                    // it will check if the it_language is already here into the database
                    if (keys[index] === 'it_language' && !it_language.rows[0].name.includes(values[index])) {
                        await db.query(`INSERT INTO it_lang (name) VALUES ('${values[index]}')`)
                    // if will check if the language is already here into the database
                    } else if (keys[index] === 'language' && !language.rows[0].name.includes(values[index])) {
                        await db.query(`INSERT INTO lang (name) VALUES ('${values[index]}')`)
                    }
                }

                // we have to call again to visualize the increase
                language = await db.query('SELECT * FROM all_language');
                it_language = await db.query('SELECT * FROM all_it_language');

                // it will prepare the response to the front
                const info = {};
                info.language = language.rows[0].name;
                info.it_language = it_language.rows[0].name

                return info;
            }
        });

    }
}
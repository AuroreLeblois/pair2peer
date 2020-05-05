const db = require('../models/db');
const Joi = require('@hapi/joi');
const Search = require('../models/Search.model');

module.exports = {
    name: 'filtered pages',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/search',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'Filter to search matches',
                tags: ['api', 'filter'],
                validate: {
                    query: Joi.object({
                        page_nb: Joi.number().min(1).required(),
                        user_nb: Joi.number().min(9).required()
                    })
                }
            },
            handler: async (request, h) => {
                
                const { page_nb, user_nb } = request.query;

                const lang = await db.query('SELECT * FROM all_language');
                const localisation = await db.query('SELECT * FROM all_country_city');
                const itLang = await db.query('SELECT * FROM all_it_language');

                const user = await db.query(`
                    SELECT *
                    FROM (SELECT
                            ROW_NUMBER() OVER (ORDER BY "id"),
                            *
                        FROM usr_profile) as byrow
                    WHERE "row_number" > $1 * ($2 - 1)
                    ORDER BY "row_number" ASC
                    LIMIT $1`,
                    [user_nb, page_nb]
                );
                
                // build the response to the front
                const info = {};
                info.language = lang.rows[0].name;
                info.it_language = itLang.rows[0].name;
                info.localisation = localisation.rows;
                info.users = user.rows

                return info
            }
        });

        server.route({
            method: 'POST',
            path: '/search',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: ['user', 'admin']
                // },
                description: 'Target of the filter, find all matches',
                tags: ['api', 'filter'],
                validate: {
                    payload: Joi.object({
                        remote: Joi.string().allow(''),
                        language: Joi.string().allow(''),
                        country: Joi.string().trim().allow(''),
                        city: Joi.string().trim().allow(''),
                        it_language: Joi.string().allow(''),
                        level: Joi.number().min(1).max(10).allow('')
                    }),
                    query: Joi.object({
                        page_nb: Joi.number().min(1).required(),
                        user_nb: Joi.number().min(9).required()
                    })
                }
            },
            handler: (request, h) => {

                const { page_nb, user_nb } = request.query;
                // use Search model to filter
                const info = Search.filter(request.payload, page_nb, user_nb);

                return info;
            }
        });

    }
}
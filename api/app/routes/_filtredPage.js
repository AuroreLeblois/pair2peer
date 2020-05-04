const db = require('../models/db');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'filtered pages',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/search',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: ['user', 'admin']
                // },
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
                info.localisation = localisation.rows;
                info.it_language = itLang.rows[0].name;
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
            handler: async (request, h) => {

                const query = request.payload;
                const { page_nb, user_nb } = request.query;

                // it will replace all special characters to struggle against SQL injection
                const regex = /[*;$><&|?@="]/g;

                // first filter, if key doesn't have any value, the pair key-value will be remove of the object
                for (let item in query) {
                    if (!query[item]) {
                        delete query[item]
                    } else {
                        query[item] = query[item].toString().toLowerCase().replace(regex, "%20");
                    }
                } 

                const keys = Object.keys(query);
                const values = Object.values(query);
                
                // it will build the SQL query filter
                let filter = values.map(( value, index ) => {
                    if (keys[index] === 'language') {
                        // example : "language" ? 'français'
                        return `"${keys[index]}" ? '${value}' `;
                    } else if (keys[index] === 'it_language') {
                        // example : it_language @> '[{ "name": "javascript", "search": true }]'
                        return `${keys[index]} @> '[{"name":"${value}", "search":true}]' `;
                    } else if (keys[index] === 'level') {
                        // exemple : it_language @> '[{ "name": "previous it_language.name", "level": 1 }]'
                        // add specific security to itName because values[index -1] doesn't have any protection
                        return `it_language @> '[{"name":"${values[index - 1]}", "level":${value}}]' `;
                    } else if (keys[index] === 'remote') {
                        // example : remote = true/ false
                        return `${keys[index]} = ${value} `;
                    } else {
                        // it will build the query from other input like country, city etc
                        return `${keys[index]} = '${value}' `;
                    }
                }).join('AND ');    

                // it will be the object response to the front
                const info = {};
                infoDetail = (maxUser, maxPage, user) => {
                    info.maxUser = maxUser.rows[0].count;
                    info.maxPage = maxPage.rows[0].count;
                    info.users = user.rows;
                }
                
                // depend to the filter, it will send the informations
                if (!filter) {
                    const maxUser = await db.query('SELECT COUNT(*) AS count FROM usr_profile');
                    const maxPage = await db.query(`SELECT CEILING(COUNT(*)/$1::float) AS count FROM usr_profile`, [user_nb]);

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

                    infoDetail(maxUser, maxPage, user);
                    return info;
                } else {
                    const maxUser = await db.query(`
                        SELECT COUNT(*) AS count FROM (
                            SELECT ROW_NUMBER() OVER (ORDER BY "id"), * FROM usr_profile 
                            WHERE ${filter}
                        ) as count_user;`
                    );

                    const maxPage = await db.query(`
                        SELECT CEILING(COUNT(*)/$1::float) AS count FROM (
                            SELECT ROW_NUMBER() OVER (ORDER BY "id"), * FROM usr_profile 
                            WHERE ${filter}
                        ) as count_max_page;`,
                        [user_nb]
                    );

                    const user = await db.query(`
                        SELECT *
                        FROM (SELECT
                                ROW_NUMBER() OVER (ORDER BY "id"),
                                *
                            FROM usr_profile
                            WHERE ${filter}) as byrow
                        WHERE "row_number" > $1 * ($2 - 1)
                        ORDER BY "row_number" ASC
                        LIMIT $1`,
                        [user_nb, page_nb]
                    );

                    infoDetail(maxUser, maxPage, user);
                    return info;
                }          
            }

        });
    }
}
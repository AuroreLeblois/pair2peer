const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const db = require('../models/db');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'filtered pages',
    
    register: async (server) => {
        await server.register([vision, inert]);

        // server.views({
        //     relativeTo: __dirname + '/..',
        //     path: 'templates',
        //     engines : { pug },
        // });

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
                tags: ['api', 'filter']
            },
            handler: async (request, h) => {
                
                const { page_nb, user_nb } = request.query;

                const lang = await db.query('SELECT * FROM all_language');
                const localisation = await db.query('SELECT * FROM all_country_city');
                const itLang = await db.query('SELECT * FROM all_it_language');
                
                const maxUser = await db.query('SELECT COUNT(*) AS count FROM usr_profile');
                const maxPage = await db.query(`SELECT CEILING(COUNT(*)/${user_nb}::float) AS count FROM usr_profile`);

                const user = await db.query(`
                    SELECT *
                    FROM (SELECT
                            ROW_NUMBER() OVER (ORDER BY "id"),
                            *
                        FROM usr_profile) as byrow
                    WHERE "row_number" > ${user_nb}*(${page_nb}-1)
                    ORDER BY "row_number" ASC
                    LIMIT ${user_nb}`
                );
                
                const info = {};
                info.language = lang.rows[0];
                info.localisation = localisation.rows;
                info.it_language = itLang.rows[0];
                info.maxUser = maxUser.rows[0];
                info.maxPage = maxPage.rows[0];
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
                        country: Joi.string().allow(''),
                        city: Joi.string().allow(''),
                        it_language: Joi.string().allow(''),
                        level: Joi.number().min(1).max(10).allow('')
                    })
                }
            },
            handler: async (request, h) => {

                const query = request.payload;
                const { page_nb, user_nb } = request.query;


                // first filter, if key doesn't have any value, the pair key-value will be remove of the object
                for (let item in query) {
                    if (!query[item]) {
                        delete query[item]
                    }
                } 

                filterQuery = [];

                const keys = Object.keys(query);
                const values = Object.values(query);
                
                const regex = /[*;$><&|?@="]/g;
                
                // it will build the SQL query filter from the query into filterQuery
                for (let index = 0; index < keys.length; index++) {
                    // it will replace all special characters to struggle against SQL injection
                    let value = values[index].toString();
                    value = value.replace(regex, '%20');

                    if (keys[index] === 'language') {
                        // example : "language" ? 'français'
                        filterQuery.push(`"${keys[index]}" ? '${value}' `);
                    } else if (keys[index] === 'it_language') {
                        // example : it_language @> '[{ "name": "javascript", "search": true }]'
                        // the IT language must have search 'true' to be findable, it mean the user want to pair programming with this
                        filterQuery.push(`${keys[index]} @> '[{"name":"${value}", "search":true}]' `);
                    } else if (keys[index] === 'level') {
                        // exemple : it_language @> '[{ "name": "previous it_language.name", "level": 1 }]'
                        // add specific security to itName because values[index -1] doesn't have any protection
                        let itName = values[index -1].toString().replace(regex, '%20');
                        filterQuery.push(`it_language @> '[{"name":"${itName}", "level":${value}}]' `);
                    } else if (keys[index] === 'remote') {
                        // example : remote = true/ false
                        filterQuery.push(`${keys[index]} = ${value} `);
                    } else {
                        // it will build the query from other input like country, city etc
                        filterQuery.push(`${keys[index]} = '${value}' `);
                    }
                }    

                // specific filter for other informations
                const finalFilter = filterQuery.join('AND ');

                // it will be the object response to the front
                const info = {};
                
                // depend to the filter, it will send the informations
                if (!finalFilter) {
                    const maxUser = await db.query('SELECT COUNT(*) AS count FROM usr_profile');
                    const maxPage = await db.query(`SELECT CEILING(COUNT(*)/${user_nb}::float) AS count FROM usr_profile`);

                    const user = await db.query(`
                        SELECT *
                        FROM (SELECT
                                ROW_NUMBER() OVER (ORDER BY "id"),
                                *
                            FROM usr_profile) as byrow
                        WHERE "row_number" > ${user_nb}*(${page_nb}-1)
                        ORDER BY "row_number" ASC
                        LIMIT ${user_nb}`
                    );

                    info.maxUser = maxUser.rows[0];
                    info.maxPage = maxPage.rows[0];
                    info.users = user.rows;

                    return info;
                } else {
                    const maxUser = await db.query(`
                        SELECT COUNT(*) AS count FROM (
                            SELECT ROW_NUMBER() OVER (ORDER BY "id"), * FROM usr_profile 
                            WHERE ${finalFilter}
                        ) as count_user;`
                    );

                    const maxPage = await db.query(`
                        SELECT CEILING(COUNT(*)/${user_nb}::float) AS count FROM (
                            SELECT ROW_NUMBER() OVER (ORDER BY "id"), * FROM usr_profile 
                            WHERE ${finalFilter}
                        ) as count_max_page;`
                    );

                    const user = await db.query(`
                        SELECT *
                        FROM (SELECT
                                ROW_NUMBER() OVER (ORDER BY "id"),
                                *
                            FROM usr_profile
                            WHERE ${finalFilter}) as byrow
                        WHERE "row_number" > ${user_nb}*(${page_nb}-1)
                        ORDER BY "row_number" ASC
                        LIMIT ${user_nb}`
                    );

                    info.maxUser = maxUser.rows[0];
                    info.maxPage = maxPage.rows[0];
                    info.users = user.rows;

                    return info;
                }          
            }

        });
    }
}
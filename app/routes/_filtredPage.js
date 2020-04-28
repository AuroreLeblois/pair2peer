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
                return 'coucou je suis la page de filtre'
                //return h.view('search');
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
                let query = request.payload

                // first filter, if key doesn't have any value, the pair key-value will be remove of the object
                for (let item in query) {
                    if (!query[item]) {
                        delete query[item]
                    }
                } 

                filterQuery = [];
                levelQuery = [];

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
                        // it will build specific format filter to match level input and higher
                        for (let levelIndex = value; levelIndex <= 10; levelIndex++) {
                            levelQuery.push(`it_language @> '[{"name":"${query.it_language}", "level":${levelIndex}}]' `);
                        }
                    } else if (keys[index] === 'remote') {
                        // example : remote = true/ false
                        filterQuery.push(`${keys[index]} = ${value} `);
                    } else {
                        // it will build the query from other input like country, city etc
                        filterQuery.push(`${keys[index]} = '${value}' `);
                    }
                }    

                // it will merge the arrays to string
                // specific filter for level
                if (levelQuery.length > 0) {
                    levelQuery = '(' + levelQuery.join('OR ') + ')';
                    filterQuery.push(levelQuery);
                }
                // specific filter for other informations
                const finalFilter = filterQuery.join('AND ');

                // depend to the filter, it will send the informations
                if (!finalFilter) {
                    const resultat = await db.query(`SELECT * FROM usr_map`);
                    return resultat.rows;
                } else {
                    const resultat = await db.query(`SELECT * FROM usr_map WHERE ` + finalFilter);
                    return resultat.rows;
                }          
            }

        });
    }
}
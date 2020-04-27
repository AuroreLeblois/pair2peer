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
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
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
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
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
                console.log(query)

                // 1er filtre, si une clé n'a pas de valeur, elle sera enlevée de l'objet
                for (let item in query) {
                    if (!query[item]) {
                        delete query[item]
                    }
                }

                const result = await db.query(`SELECT * FROM usr_map`);

                const dataFiltered = result.rows.filter(item => {
                    for (let key in query) {

                        if (key === 'remote') {
                            // si dans remote, la valeur n'est pas la même quand dans la query, on l'écarte
                            // la valeur de la clé remote est une string (n'accepte pas de value booléen dans le radio) 
                            // => item[key].toString()
                            // autre version, passage de la string ("true", "false") en json donc booléen 
                            // => JSON.parse(query[key])
                            if (JSON.parse(query[key]) !== item[key]) {
                                return false;
                            };
                        } else if (key === 'language') {
                            // si dans le tableau language, la langue n'est pas présente, on l'écarte
                            if (!item[key].includes(query[key])) {
                                return false;
                            };
                        } else if (key === 'it_language') { 
                            // si dans chaque tableau it_language, le langage n'est pas présent, on l'écarte (grâce à find + ! (booléen))
                            // search true => si la personne souhaite apprendre ce langage
                            if (!item[key].find(element => element.name === query[key] && element.search === true)) {
                                return false;
                            };
                        } else if (key === 'level') {
                            // si dans chaque tableau it_language, le nom n'est pas présent et que le niveau est inférieur à la query, on l'écarte
                            if (!item['it_language'].find(element => element.name === query.it_language && element.level >= query[key])) {
                                return false;
                            };
                        } else if (!query[key].includes(item[key])) {
                            // si la valeur "simple" (pseudo, country, city) n'est pas présente, on l'écarte
                            return false;
                        };
                    };
                    return true
                });
                return `oui... il y a sans doute des gens qui correspondent`
                //return dataFiltered;
           
            }
        });
    }
}
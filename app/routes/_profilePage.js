const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const db = require('../models/db');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'profile pages',
    register: async (server) => {
        await server.register([vision, inert]);

        // server.views({
        //     relativeTo: __dirname + '/..',
        //     path: 'templates',
        //     engines : { pug },
        // });

        server.route({
            method: 'GET',
            path: '/profile',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'User\'s profile',
                tags: ['api', 'profile']
            },
            handler: async (request, h) => {
                // passage de true string en true boolean 
                // => utile pour modifier oui ou non remote dans 'POST'
                // console.log(JSON.parse("true"))

                const email = request.state.cookie.email;
                const result = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
                const user = result.rows[0];
                return  {user};
            }
        });


        server.route({
            method: 'GET',
            path: '/profile/{pseudo}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'Other user\'s profile page',
                tags: ['api', 'other profile'],
                validate: {
                    params: Joi.object({
                        pseudo: Joi.string().required()
                    })
                }
            },
            handler: async (request, h) => {
                const pseudo = request.params.pseudo;
                const result = await db.query(`SELECT * FROM usr_map WHERE pseudo = $1`, [pseudo]);

                const user = result.rows[0];
                return {user};
            }
        });
    

}
}
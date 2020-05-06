const db = require('../models/db');
const Joi = require('@hapi/joi');
const User = require('../models/User.model');

module.exports = {
    name: 'get profile pages',
    register: async (server) => {

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
                tags: ['api', 'profile', 'info']
            },
            handler: async (request, h) => {

                // normally the front have access to these informations by post /login into the state
                const email = request.state.cookie.email;
                const user = await db.query(`SELECT * FROM usr_profile WHERE email = $1`, [email]);
                // no need to check if the user exist, because if the user want to access this path, he have to be logged
                return user.rows[0];
            }
        });

        server.route({
            method: 'DELETE',
            path: '/profile',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'User\'s profile',
                tags: ['api', 'profile', 'delete']
            },
            handler: async (request, h) => {
                
                // collect email through cookie and then delete the user
                const email = request.state.cookie.email;
                await User.delete(email);
                return h.redirect('/');
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
                tags: ['api', 'other' ,'profile'],
                validate: {
                    params: Joi.object({
                        pseudo: Joi.string().required()
                    })
                }
            },
            handler: async (request, h) => {

                const { pseudo } = request.params;
                // use User model to see other user profile
                const profile = await User.oprofile(pseudo);
                
                if (profile.statusCode) {
                    // if error, send error messages
                    return h.response(profile).code(400);
                } else {
                    // if success, send user informations
                    return profile;
                };
            } 
        }); 

    }
}
const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const db = require('../models/db');
const Joi = require('@hapi/joi');


module.exports = {
    name: 'logs pages',
    register: async (server) => {
        await server.register([vision, inert]);

        // server.views({
        //     relativeTo: __dirname + '/..',
        //     path: 'templates',
        //     engines : { pug }
        // });

        server.route({
            method: 'GET',
            path: '/login',
            config: {
                description: 'Log form',
                tags: ['api', 'login']
            },
            handler: function (request, h) {
    
                return h.view('login');
            }
        });

        server.route({
            method: 'POST',
            path: '/login',
            config: {
                description: 'Log form\'s target, launch the connection',
                tags: ['api', 'login'],
                validate: {
                    payload: Joi.object({
                        email: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async (request, h) => {
    
                const { email, password } = request.payload;
                
                const visitor = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
    
                const user = visitor.rows[0];
    
                if (!user ||
                    !await bcrypt.compare(password, user.password)) {
                    return h.view('login', { error: true });
                }
    
                request.cookieAuth.set({email});
                // request.yar.set({email});
                // console.log(request.yar.get('email'))
                 return h.redirect('/concept');
            }
        });

        server.route({
            method: 'GET',
            path: '/logout',
            config: {
                description: 'Remove the authentification by cookie',
                tags: ['api', 'logout']
            },
            handler: (request, h) => {
                
                request.cookieAuth.clear()
                // request.yar.reset();
                return h.redirect('/');
            }
        });

        server.route({
            method: 'GET',
            path: '/signup',
            config: {
                description: 'Signup form',
                tags: ['api', 'signup']
            },
            handler: (request, h) => {
                return h.view('signup');
            }
        });

        server.route({
            method: 'POST',
            path: '/signup',
            config: {
                description: 'Signup form\'s target, add new user into the database',
                tags: ['api', 'signup'],
                validate: {
                    payload: Joi.object({
                        email: Joi.string().email({ minDomainSegments: 2}).required(),
                        pseudo: Joi.string().required(),
                        password: Joi.string().min(8).required(),        
                        passwordConfirm: Joi.ref('password'),
                        country: Joi.string().required(),
                        city: Joi.string().required(),
                        remote: Joi.string().required(),
                        role: Joi.string().required()
                    }),
                    options: {
                        abortEarly: false
                    },
                    failAction: (request, h, err) => {

                        const errors = {};
                        const details = err.details;
                        
                        for (let index = 0; index < details.length; index++) {

                            let path = details[index].path[0];
                            let typeError = details[index].type;

                            // pas besoin de faire des messages explicites si l'input est vide car c'est une contrainte du front (required)
                            if (path === 'email' && typeError === 'string.email') {
                                errors[path] = 'L\'email n\'est pas un email valide';
                            } else if (path === 'password' && typeError === 'string.min') {
                                errors[path] = 'Le mot de passe doit contenir 8 caractères minimum';
                            } else if (path === 'passwordConfirm' && typeError === 'any.only') {
                                errors[path] = 'Le mot de passe et la confirmation ne correspondent pas';
                            };
                        };

                        err.output.payload.message = errors;
                        throw err;
                    }
                }
            },
            handler: async (request, h) => {

                // node -e "console.log(require('bcrypt').hashSync('azertyui', 10));"

                const { email, pseudo, password, country, city, remote } = request.payload;
                const registered = await db.query('SELECT pseudo FROM usr WHERE email = $1', [email]);
                const nameRegistered = await db.query('SELECT pseudo FROM usr');

                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };

                if (registered.rows[0]) {
                    errorList.message.emailUsed = 'Cet email existe déjà';
                } 

                for (let registered of nameRegistered.rows) {
                    if (pseudo.toLowerCase() === registered.pseudo.toLowerCase()) {
                        errorList.message.usernameUsed = 'Ce nom d\'utilisateur existe déjà';
                    }
                }

                if (errorList.message.usernameUsed || errorList.message.emailUsed) {
                    return h.response(errorList).code(400);
                } 

                const hashPassword = bcrypt.hashSync(password, 10);

                const newRegistered = await db.query('SELECT * FROM add_user($1, $2, $3, $4 ,$5 ,$6)',
                [email, pseudo, hashPassword, country, city, JSON.parse(remote)]);

                console.log(newRegistered.rows[0]);

                // request.cookieAuth.set({ email: newRegistered.rows[0].email });

                return h.redirect('/login');
            }
        })
    }
}
const Joi = require('@hapi/joi');
const User = require('../models/User.model');
// const Mail = require('../models/Mail.model');

module.exports = {
    name: 'logs pages',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/login',
            config: {
                description: 'Log form',
                tags: ['api', 'login']
            },
            handler: (request, h) => {

                return 'à définir';
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
                // use User model to log
                const info = await User.login(email, password);

                if (info.statusCode) {
                    // if error, send error messages
                    return h.response(info).code(400);
                } else {
                    // if success, set the cookie and send user informations
                    request.cookieAuth.set({ email });
                    return info;
                }
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
                
                // remove the cookie
                request.cookieAuth.clear();
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

                return 'à définir';
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
                        email: Joi.string().email({ minDomainSegments: 2}).trim().required(),
                        pseudo: Joi.string().trim().required(),
                        password: Joi.string().min(8).required(),        
                        passwordConfirm: Joi.ref('password'),
                        country: Joi.string().trim().required(),
                        city: Joi.string().trim().required(),
                        remote: Joi.string().required(),
                        captchaValue: Joi.string().required()
                    }),
                    options: {
                        // false mean I go through each key (payload) even if one error appears	
                        // true mean the code throw directly an error starting from the first error and doesn't check other key
                        abortEarly: false
                    },
                    // if the joi validate failed, have to declare failAction to custom error messages
                    failAction: (request, h, err) => {
                        
                        // errors object will be the object who contains all the error messages (in french)
                        const errors = {};
                        const details = err.details;
                        
                        // depend on each error, it will write a specific error message
                        for (let index = 0; index < details.length; index++) {

                            let path = details[index].path[0];
                            let typeError = details[index].type;

                            // no need to write a specific error message if the input is empty because the constraint is set on the front side
                            if (path === 'email' && typeError === 'string.email') {
                                errors[path] = 'L\'email n\'est pas un email valide';
                            } else if (path === 'password' && typeError === 'string.min') {
                                errors[path] = 'Le mot de passe doit contenir 8 caractères minimum';
                            } else if (path === 'passwordConfirm' && typeError === 'any.only') {
                                errors[path] = 'Le mot de passe et la confirmation ne correspondent pas';
                            } else if (path === 'captchaValue' && typeError === 'string.empty') {
                                errors[path] = 'Le captcha doit être validé';
                            };
                        };

                        err.output.payload.message = errors;
                        throw err;
                    }
                }
            },
            handler: async (request, h) => {

                const { email, pseudo, password, country, city, remote, captchaValue } = request.payload;
                // use User model to signup
                const info = await User.signup(email, pseudo, password, country, city, remote, captchaValue);

                if (info.statusCode) {
                    // if error, send error messages
                    return h.response(info).code(400);
                } else {
                    // if success, send an email to verify the veracity of the account
                    // await Mail.mailer(email);
                    // and then send new user's informations
                    return info;
                }
            }
        });

        // server.route({
        //     method: 'GET',
        //     path: '/activation/user/{email}',
        //     config: {
        //         description: 'Activation of the account',
        //         tags: ['api', 'activation'],
        //         validate: {
        //             params: Joi.object({
        //                 email: Joi.string().email({ minDomainSegments: 2}).trim().required()
        //             })
        //         }
        //     },
        //     handler: async (request, h) => {

        //         await Mail.activation(request.params.email);
        //         return h.redirect('/login');
        //     }
        // });

    }
}
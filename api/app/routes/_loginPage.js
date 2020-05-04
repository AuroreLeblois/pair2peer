const bcrypt = require('bcrypt');
const db = require('../models/db');
const Joi = require('@hapi/joi');
const Wreck = require('@hapi/wreck');

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
            handler: function (request, h) {
    
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
                console.log(request.payload)
                
                // test if the email exist
                const visitor = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
                const user = visitor.rows[0];
    
                // build a formated object error message like native Hapi
                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };

                // create specific error message depend on the data
                if (!user) {
                    errorList.message.errorEmail = 'Cet email n\'existe pas';
                    errorList.message.errorPassword = 'Mauvais mot de passe';
                };
                if (user && !await bcrypt.compare(password, user.password)) {
                    errorList.message.errorPassword = 'Mauvais mot de passe';
                };
                
                // return error message if exists 
                if (errorList.message.errorEmail || errorList.message.errorPassword) {
                    return h.response(errorList).code(400);
                }
                // if the process passed all the verifications, it will set a cookie for the authentification (server.js)
                request.cookieAuth.set({email});

                // send all informations about the user logged for the front in react
                const userInfos = await db.query(`SELECT * FROM usr_profile WHERE email = $1`, [email]) 
                return userInfos.rows[0];
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
                            };
                        };

                        err.output.payload.message = errors;
                        throw err;
                    }
                }
            },
            handler: async (request, h) => {

                const { email, pseudo, password, country, city, remote } = request.payload;
                const registered = await db.query('SELECT pseudo FROM usr WHERE email = $1', [email]);
                const nameRegistered = await db.query('SELECT pseudo FROM usr');

                const api = await Wreck.get(`https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}&apiKey=${process.env.APIKEY}`, {
                    json: true
                });

                // build an error object who will contain all the specific error messages based on Hapi native error message
                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };

                // check if the address'input goes wrong
                if (!api.payload.items[0]) {
                    errorList.message.wrongAddress = 'Le pays ou la ville n\'existe pas';
                };

                // check the errors that I cannot verify inside the failAction 
                if (registered.rows[0]) {
                    errorList.message.emailUsed = 'Cet email existe déjà';
                };

                for (let registered of nameRegistered.rows) {
                    if (pseudo.toLowerCase() === registered.pseudo.toLowerCase()) {
                        errorList.message.usernameUsed = 'Ce nom d\'utilisateur existe déjà';
                    }
                };

                if (errorList.message.usernameUsed
                    || errorList.message.emailUsed
                    || errorList.message.wrongAddress) {
                    return h.response(errorList).code(400);
                };

                // collect the address and coordinates through the API
                const { address, position } = api.payload.items[0];

                // hash the password and add salt to prevent hacking
                const hashPassword = bcrypt.hashSync(password, 10);

                // create a new user
                const newRegistered = await db.query('SELECT * FROM add_usr($1, $2, $3)', [email, pseudo, hashPassword]);

                // bind some descriptions to the new user
                const newRegisteredDetail = await db.query('SELECT * FROM add_usr_detail($1, $2, $3, $4, $5, $6)', [newRegistered.rows[0].id, address.countryName, address.city, position.lat, position.lng, remote]);

                console.log(newRegistered.rows[0]);
                return 'ok enregistré'
                // return h.redirect('/login');
            }
        })
    }
}
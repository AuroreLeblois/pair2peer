const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const bcrypt = require('bcrypt');
const db = require('../models/db');
const Joi = require('@hapi/joi');
const Wreck = require('@hapi/wreck');
const APIKEY= process.env.APIKEY;
// const User = require('../models/User.model')


module.exports = {
    name: 'logs pages',
    register: async (server) => {
        await server.register([vision, inert]);

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
                // const info = await User.login(email, password);

                // if (info.statusCode) {
                //     return h.response(info).code(400);
                // } else {
                //     request.cookieAuth.set({ email });
                //     return info;
                // }

                
                const visitor = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
                const user = visitor.rows[0];

                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };
                // const errorList = {}

                if (!user) {
                    errorList.message.errorEmail = 'Cet email n\'existe pas';
                    errorList.message.errorPassword = 'Mauvais mot de passe';
                    // errorList.errorEmail = 'Cet email n\'existe pas';
                    // errorList.errorPassword = 'Mauvais mot de passe';
                };
                if (user && !await bcrypt.compare(password, user.password)) {
                    errorList.message.errorPassword = 'Mauvais mot de passe';
                    // errorList.errorPassword = 'Mauvais mot de passe';
                };
                
                if (errorList.message.errorEmail || errorList.message.errorPassword) {
                    // const error = Boom.badRequest(errorList);
                    // console.log(test);
                    return h.response(errorList).code(400);
                }

                request.cookieAuth.set({ email });
                // request.yar.set({email});
                // console.log(request.yar.get('email'))
                
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
                        email: Joi.string().email({ minDomainSegments: 2}).trim().required(),
                        pseudo: Joi.string().trim().required(),
                        password: Joi.string().min(8).required(),        
                        passwordConfirm: Joi.ref('password'),
                        country: Joi.string().trim().required(),
                        city: Joi.string().trim().required(),
                        remote: Joi.string().required(),
                        // role: Joi.string().required()
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
                // const info = User.signup(email, pseudo, password, country, city, remote)

                // if (info.statusCode) {
                //     return h.response(info).code(400);
                // } else {
                //     return info;
                // }

                const registered = await db.query('SELECT pseudo FROM usr WHERE email = $1', [email]);
                const nameRegistered = await db.query('SELECT pseudo FROM usr');

                const api = await Wreck.get(`https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}&apiKey=${APIKEY}`, {
                    json: true
                });
               
                console.log(api.payload.items[0])

                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };

                if (!api.payload.items[0]) {
                    errorList.message.wrongAddress = 'Le pays ou la ville n\'existe pas'
                };

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

                const { address, position } = api.payload.items[0];

                const hashPassword = bcrypt.hashSync(password, 10);

                const newRegistered = await db.query('SELECT * FROM add_usr($1, $2, $3)',
                [email, pseudo, hashPassword]);

                const newRegisteredDetail = await db.query('SELECT * FROM add_usr_detail($1, $2, $3, $4, $5, $6)', [newRegistered.rows[0].id, address.countryName.toLowerCase(), address.city.toLowerCase(), position.lat, position.lng, remote]);

                const newUser = await db.query('SELECT * FROM usr_profile WHERE id = $1', [newRegistered.rows[0].id]);

                // request.cookieAuth.set({ email: newRegistered.rows[0].email });
                const newUserProfile = newUser.rows[0]
                return newUserProfile;
            }
        })
    }
}
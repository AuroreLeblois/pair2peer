const Joi = require('@hapi/joi');
const Mail = require('../models/Mail.model');

module.exports = {
    name: 'contact page',
    register: async (server) => {

        server.route({
            method: 'POST',
            path: '/contact',
            config: {
                description: 'Contact form\'s target, send request to us',
                tags: ['api', 'contact'],
                validate: {
                    payload: Joi.object({
                        name: Joi.string().required(),
                        email: Joi.string().required(),
                        message: Joi.string().required()
                    })
                }
            },
            handler: async (request, h) => {

                const { name, email, message } = request.payload;
                await Mail.mailerRequest(name, email, message);
                return 'Mail envoyé';
            }
        });

    }
};
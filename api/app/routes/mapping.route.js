const Joi = require('@hapi/joi');
const Mapping = require('../models/Mapping.model');

module.exports = {
    name: 'map page',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/map',
            config: {
                description: 'Map representation',
                tags: ['api', 'map']
            },
            handler: async (request, h) => {

                const users = await Mapping.findAll();
                return users;
            }
        });
    }

}
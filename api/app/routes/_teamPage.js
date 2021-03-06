const vision = require('@hapi/vision');
const inert = require('@hapi/inert');

module.exports = {
    name: 'present',
    register: async (server) => {
        await server.register([vision, inert]);


        server.route({
            method: 'GET',
            path: '/about',
            config: {
                description: 'Team Page',
                tags: ['api', 'team'] 
            },
            handler: async (request, h) => {
                const team=["Charles","Aurore","Victor","Max"];
                return team;
            }
        });
    }
}
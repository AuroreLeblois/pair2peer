const vision = require('@hapi/vision');
const inert = require('@hapi/inert');

module.exports = {
    name: 'present',
    register: async (server) => {
        await server.register([vision, inert]);


        server.route({
            method: 'GET',
            path: '/who-are-we',
            config: {
                description: 'Team Page',
                tags: ['api', 'team'] 
            },
            handler: async (request, h) => {
            
                return `la fine équipe:
                -Charles
                -Maximilen
                -Victor
                -Aurore`;
            }
        });
    }
}
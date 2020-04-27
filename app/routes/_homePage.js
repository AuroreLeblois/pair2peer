const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const react= require('react');

module.exports = {
    name: 'home pages',
    register: async (server) => {
        await server.register([vision, inert]);

        // server.views({
        //     relativeTo: __dirname + '/..',
        //     path: 'templates',
        //     engines : { react },
        // });

        server.route({
            method: 'GET',
            path: '/',
            config: {
                description: 'Homepage',
                tags: ['api', 'homepage'] 
            },
            handler: function (request, h) {
                return 'bienvenue'
               // return h.view('home');
            }
        });

        server.route({
            method: 'GET',
            path: '/concept',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'Example : restricted page for users authentified',
                tags: ['api', 'concept']
            },
            handler: (request, h) => {
                return `tout ceci est fort conceptuel`
               // return h.view('concept');
            }
        });
    }
}
const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const react= require('react');

module.exports = {
    name: 'chat pages',
    register: async (server) => {
        await server.register([vision, inert]);


        server.route({
            method: 'GET',
            path: '/chatroom/{chatName}',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: ['user', 'admin']
                // },
                description: 'ChatRoom with people',
                tags: ['api', 'chatroom']
            },
            handler: function (request, h) {
                const chatCode= request.params.chatName;
                return `Vous allez commencer un chatroom numéro ${chatCode}`
               
            }
        });
    }
}
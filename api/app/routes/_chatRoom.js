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
                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`,[chatCode]);
                if(!chatExists.rows[0]){
                    return h.response(400);
                }
                return `Vous allez commencer un chatroom numéro ${chatCode}`
               
            }
        });
        server.route({
            method: 'GET',
            path: '/chatroom/{chatName}',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: ['user', 'admin']
                // },
                validate: {
                    params: Joi.object({
                       chatName: Joi.string().required()
                    }),
                },
                description: 'ChatRoom with people',
                tags: ['api', 'chatroom']
            },
            handler: function (request, h) {
                const participants=[];
                const myEmail= request.state.cookie.email;
                const me= await db.query(`SELECT * FROM usr WHERE email=$1`,[myEmail]);
                const myEmail= me.rows[0].email;
                const myName= me.rows[0].pseudo;
                participants.push(myName);
                const chatCode= request.params.chatName;
                return `Vous allez commencer un chatroom numéro ${chatCode}`
               
            }
        });
    }
}
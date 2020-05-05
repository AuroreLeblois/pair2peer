const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const Joi = require('@hapi/joi');

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
                validate: {
                    params: Joi.object({
                       chatName: Joi.string().required()
                    }),
                },
                description: 'ChatRoom with people',
                tags: ['api', 'chatroom']
            },
            handler: async function (request, h) {
                const participants=[];
                const error= [];
                
                const myEmail= request.state.cookie.email;
                const me= await db.query(`SELECT * FROM usr WHERE email=$1`,[myEmail]);
                const myName= me.rows[0].pseudo;
                participants.push(myName);
                const chatCode= request.params.chatName;
                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`, [chatCode]);
                    if(!chatExists.rows[0]){
                        error.push("Cette chatroom n'existe pas ou a été suprimée");
                        
                         return h.response(error).code(400);
                     }
                     else{
                         const messages= await db.query(`SELECT script, "date" FROM usr_message_chat 
                                                        WHERE chat_id=$1`,[chatExists.rows[0].id]);
                        return h.code(200);
                     }
               
            }
        });
    }
}
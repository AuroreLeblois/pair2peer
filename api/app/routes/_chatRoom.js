const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'chat pages',
    register: async (server) => {
        await server.register([vision, inert]);

        server.route({
            //get existing chat room
            method: 'GET',
            path: '/chatroom/{chatName}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
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
                         const deleteMessage= await db.query(`SELECT * FROM usr_message_chat
                                                              WHERE chat_id=$1
                                                              AND (NOW()-"date")>'30 days'`,[chatExists.rows[0].id]);
                        if(deleteMessage.rows[0]){
                            await db.query(`DELETE FROM usr_message_chat
                                            WHERE chat_id=$1
                                            AND (NOW()-"date")>'30 days`,[chatExists.rows[0].id]);
                        }
                         const messages= await db.query(`SELECT script, "date" FROM usr_message_chat 
                                                        WHERE chat_id=$1`,[chatExists.rows[0].id]);
                        
                        return messages.rows;
                     }
               
            }
        });

        server.route({
            //create a chat room
            method: 'POST',
            path: '/chatroom',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                validate: {
                    payload: Joi.object({
                       nameForChatRoom: Joi.string().required(),
                       invited:Joi.string().required()
                    }),
                },
                description: 'ChatRoom with people',
                tags: ['api', 'chatroom']
            },
            handler: async function (request, h) {
                const invited= request.payload.pseudo;
                const chatName= request.payload.chatName;
                error=[];
                if(chatName.toLowerCase().includes('truncate')
                ||chatName.toLowerCase().includes('drop')
                ||chatName.toLowerCase().includes('database')){
                   error.push(`invalid name for chat room`);
                }
                if(error.lenght>0){
                    return h.response(error).code(403)
                }
                const invitedInfo= await db.query(`SELECT * FROM usr WHERE pseudo=$1`,[invited]);
                const invitedID= invitedInfo.rows[0].id;
                const myEmail= request.state.cookie.email;
                const me= await db.query(`SELECT * FROM usr WHERE email=$1`,[myEmail]);
                const myID= me.rows[0].id;
                //maintenant que l'on trouve 2 utilisateurs
                //on verifie si il ont une chat room en commun avant d'en créer une
                const newChat= await db.query(`INSERT INTO chat ("name")VALUES ($1) RETURNING *`,[chatName]);
                const ChatID= newChat.rows[0].id;
                await db.query(`INSERT INTO usr_message_chat ( usr_id, chat_id) VALUES($1,$2)`,[invitedID, ChatID]);
                await db.query(`INSERT INTO usr_message_chat ( usr_id, chat_id) VALUES($1,$2)`,[myID, ChatID]);
            }
        });
    }
}
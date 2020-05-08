const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const Joi = require('@hapi/joi');
const db = require('../models/db');

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
                        chatSerial: Joi.string()
                    }),
                },
                description: 'ChatRoom with people',
                tags: ['api', 'chatroom']
            },
            handler: async function (request, h) {
                const error= [];
                const myEmail= request.state.cookie.email;
                const me= await db.query(`SELECT * FROM usr WHERE email=$1`,[myEmail]);
                const chatCode= request.params.chatSerial;
                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`, [chatCode]);
                    if(!chatExists.rows[0]){
                        error.push("Cette chatroom n'existe pas ou a été suprimée");
                        
                         return h.response(error).code(404);
                     }
                     else{
                         //on verifie que le user soit dans la chatroom pour éviter les indésirables
                         const usrInChat= await db.query(`SELECT * FROM all_my_message_in_chat
                                                            WHERE usr_id=$1`,[me.rows[0].id]);
                        if(!usrInChat.rows[0]){
                            error.push("Vous n'êtes pas invité sur cette chatroom!")
                            return h.response(error).code(403);
                            
                        }
                         const deleteMessage= await db.query(`SELECT * FROM usr_message_chat
                                                              WHERE chat_id=$1
                                                              AND (NOW()-"date")>'30 days'`,[chatExists.rows[0].id]);
                        if(deleteMessage.rows[0]){
                            await db.query(`DELETE FROM usr_message_chat
                                            WHERE chat_id=$1
                                            AND (NOW()-"date")>'30 days`,[chatExists.rows[0].id]);
                        }
                         const messages= await db.query(`SELECT * FROM all_my_message_in_chat
                                                         WHERE chat_id=$1
                                                         ORDER BY "date" DESC;`,[chatExists.rows[0].id]);
                        return h.response(messages.rows[0]).code(200);
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
                       invited:Joi.string().required(),
                    }),
                },
                description: 'create a chat room',
                tags: ['api', 'chatroom']
            },
            handler: async function (request, h) {
                const invited= request.payload.invited;
                const chatName= request.payload.nameForChatRoom;
                error=[];
                if(chatName.toLowerCase().includes('truncate')
                    ||chatName.toLowerCase().includes('drop table')
                    ||chatName.toLowerCase().includes('database')
                    ||chatName.toLowerCase().includes('delete from')
                    ||chatName.toLowerCase().includes('*')){
                   error.push(`invalid name for chat room`);
                   return h.response(error).code(403);
                }
                else{
    
                    const invitedInfo= await db.query(`SELECT * FROM usr WHERE pseudo=$1`,[invited]);
  
                    if(!invitedInfo.rows[0]){
                        error.push("invalid user name")
                        return h.response(error).code(404)
                    }
                    const invitedID= invitedInfo.rows[0].id;
                 const myEmail= request.state.cookie.email;
                   
                    const me= await db.query(`SELECT * FROM usr WHERE email=$1`,[myEmail]);

                    const myID= me.rows[0].id;
                    //maintenant que l'on trouve 2 utilisateurs
                    //on créer la chat room
                    const newChat= await db.query(`INSERT INTO chat ("name")VALUES ($1) RETURNING *`,[chatName]);
                    const ChatID= newChat.rows[0].id;
                    if(error.lenght>0){
                        return h.response(error).code(400);
                    }
                    else{
                        await db.query(`INSERT INTO usr_message_chat ( usr_id, chat_id, "date") 
                                        VALUES($1,$2, NOW())`,[invitedID, ChatID]);
                         
                        await db.query(`INSERT INTO usr_message_chat ( usr_id, chat_id, "date") 
                                        VALUES($1,$2, NOW())`,[myID, ChatID]);
                                
                        const messages= await db.query(`SELECT * FROM all_my_message_in_chat 
                                                        WHERE chat_id=$1 
                                                        ORDER BY "date" DESC`,[ChatID]);
                        
                        return h.response(messages.rows).code(200);
                }
            }
        }
        
        });
        server.route({
            //post new message
            method: 'POST',
            path: '/chatroom/{chatName}',
            options: {
                // auth: {
                //     strategy: 'base',
                //     mode: 'required',
                //     scope: ['user', 'admin']
                // },
                validate: {
                //     params: Joi.object({
                //         chatSerial: Joi.string()
                //     }),
                    payload: Joi.object({
                       message:Joi.string().required()
                    }),
                },
                description: 'handle post message on chat room',
                tags: ['api', 'chatroom']
            },
            handler: async function (request, h) {
                //  const chatSerial= request.params.chatSerial;
                const chatSerial='edbff1'
               const message= request.payload.message;
            //  const email= request.state.cookie.email;
                const email= 'awawexd@hotmail.fr';
                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`,[chatSerial]);

                if(!chatExists.rows[0]){
                    const error= `Can not find chatroom`
                    return h.response(error).code(404)
                }
                chatID= chatExists.rows[0].id;
             
               const me= await db.query(`SELECT * FROM usr WHERE email=$1`,[email]);
                const myID= me.rows[0].id;
                console.log(message, myID,chatID)
                await db.query(`INSERT INTO usr_message_chat(script,usr_id,chat_id) VALUES($1,$2,$3);`[message,myID,chatID]);
                                                 console.log(`insert ok`)
                return h.response().code(200);
            }
        
        });
        server.route({
           //add new user to chatroom
            method: 'PATCH',
            path: '/chatroom/{chatName}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                validate: {
                    params: Joi.object({
                        chatSerial: Joi.string().alphanum(),
                    }),
                    payload: Joi.object({
                       newChatter: Joi.string()
                    }),
                },
                description: 'add new chatter to chat room',
                tags: ['api', 'chatroom','update']
            },
            handler: async function (request, h) {
            //    const chatSerial= request.params.chatSerial;
            const chatSerial= 'edbff1'
               const newChatter= request.payload.newChatter;
               console.log(chatSerial, newChatter)
            //    const email= request.state.cookie.email;

               const email= 'awawexd@hotmail.fr';
               console.log(chatSerial)
                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`,[chatSerial]);
                if(!chatExists.rows[0]){
                    const error=`chat not found `
                    return h.response(error).code(404);
                }
                console.log(`j'ai trouvé la chatid`)
                chatID= chatExists.rows[0].id;
                const me= await db.query(`SELECT * FROM usr 
                                            WHERE email=$1`,[email]);
                const myID= me.rows[0].id;
                const usrInChat= await db.query(`SELECT * FROM all_my_message_in_chat
                                                 WHERE usr_id=$1;`,[me.rows[0].id]);
                    if(!usrInChat.rows[0]){
                        error.push("Vous n'êtes pas invité sur cette chatroom!")
                        return h.response(error).code(403);

                    }

                const newInvited= await db.query(`SELECT * FROM usr WHERE pseudo=$1;`,[newChatter]);
                if(!newInvited.rows[0]){
                    error.push(`Cannot find user ${newChatter}`)
                    return h.response(error).code(404);
                }
                else{

                const newChatterID= newInvited.rows[0].id;
                await db.query(`INSERT INTO usr_message_chat ( "date", usr_id, chat_id) 
                                                VALUES(NOW(),$1,$2)`[newChatterID, chatID]);
                console.log('insert ok')
                const messages= await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE chat_id=$1`,[chatID])
                return h.response(messages.rows).code(200);
            }
        }
        
        });

}
}
const Joi = require('@hapi/joi');
const db = require('../models/db');
const User = require('../models/User.model');
const Chat = require('../models/Chat.model')

module.exports = {
    name: 'chat pages',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/inbox',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'my chat rooms',
                tags: ['api', 'chatroom', 'everything']
            },
            handler: async (request, h) => {

                // use User model to find one user by his email through the cookie
                const user = await User.findOne(request.state.cookie);
                const chatRooms = await db.query(`
                    SELECT * FROM chat_message
                    WHERE to_json(ARRAY(SELECT jsonb_array_elements(users) ->> 'pseudo'))::jsonb ? $1`,
                [user.pseudo]);
                
                return chatRooms.rows;
            }
        });

        server.route({
            //get existing chat room
            method: 'GET',
            path: '/chatroom/{chatSerial}',
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
                         const chatID= chatExists.rows[0].id;
                         //on verifie que le user soit dans la chatroom pour éviter les indésirables
                         const usrInChat= await db.query(`SELECT * FROM all_my_message_in_chat
                                                            WHERE usr_id=$1
                                                            AND chat_id=$2`,[me.rows[0].id, chatExists.rows[0].id]);
                        if(!usrInChat.rows[0]){
                            error.push("Vous n'êtes pas invité sur cette chatroom!")
                            return h.response(error).code(403);
                            
                        }
                         const deleteMessage= await db.query(`SELECT * FROM usr_message_chat
                                                              WHERE chat_id=$1
                                                              AND (NOW()-"date")>'30 days'`,[chatID]);
                        if(deleteMessage.rows[0]){
                            Chat.deleteOldInChat(ChatID);
                        }
                         const messages= await db.query(`SELECT * FROM
                                                        chat_message 
                                                        WHERE chat_serial=$1`,[chatCode]);
                        console.log(messages.rows[0].messages)
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
                       invited:Joi.string().required(),
                       message:Joi.string().required()
                    }),
                },
                description: 'create a chat room',
                tags: ['api', 'chatroom']
            },
            handler: async function (request, h) {
                const invited= request.payload.invited;
                const message= request.payload.message;
                error=[];
                    if(message.lenght=0){
                        error.push(`Merci d'écrire quelque chose pour votre premier message`)
                        return h.response(error)
                    }
                    const invitedInfo= await db.query(`SELECT * FROM usr WHERE pseudo=$1`,[invited]);
                    if(!invitedInfo.rows[0]){
                        error.push("invalid user name")
                        return h.response(error).code(404)
                    }
                    const invitedID= invitedInfo.rows[0].id;

                    const invitedPseudo= invitedInfo.rows[0].pseudo;
                    const myEmail= request.state.cookie.email;
                   
                    const me= await db.query(`SELECT * FROM usr WHERE email=$1`,[myEmail]);

                    const myID= me.rows[0].id;
                    const myPseudo= me.rows[0].pseudo;
                    //si on essaye de s'inviter nous-même...
                    if(invited===myPseudo){
                       error.push(`Vous ne pouvez pas vous inviter vous-même`);
                       return h.response(error).code(400) 
                    }
                    const chatName= `${invitedPseudo} + ${myPseudo}`;
                    //si la conversation existe déjà
                    const alreadyChatting=await db.query(`SELECT * FROM chat WHERE "name" LIKE '%${myPseudo}%'
                                                          AND "name" LIKE '%${invited}%';`);
                    if(alreadyChatting.rows[0]){
                        error.push(`Vous discutez déjà avec cette personne. Vous pouvez trouver cette conversation dans votre messagerie.`);
                        return h.response(error).code(400);
                    }
                    //maintenant que l'on trouve 2 utilisateurs
                    //on créer la chat room
                    const newChat= await db.query(`INSERT INTO chat ("name")VALUES ($1) RETURNING *`,[chatName]);
                    const ChatID= newChat.rows[0].id;
                    if(error.lenght>0){
                        return h.response(error).code(400);
                    }
                    else{
                        await Chat.insertMessage(invitedID,ChatID,myID,message);
                                
                        const messages= await db.query(`SELECT * FROM all_my_message_in_chat 
                                                        WHERE chat_id=$1 
                                                        ORDER BY "date" ASC`,[ChatID]);
                        
                        return h.response(messages.rows[0].chat_serial).code(200);
                }
            // }
        }
        
        });
        server.route({
            //post new message
            method: 'POST',
            path: '/chatroom/{chatSerial}',
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
                    payload: Joi.object({
                       message:Joi.string().required()
                    }),
                },
                description: 'handle post message on chat room',
                tags: ['api', 'chatroom']
            },
            handler: async function (request, h) {
                const chatSerial= request.params.chatSerial;
               const message= request.payload.message;
                const email= request.state.cookie.email;

                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`,[chatSerial]);

                if(!chatExists.rows[0]){
                    const error= `Can not find chatroom`
                    return h.response(error).code(404)
                }
                chatID= chatExists.rows[0].id;
             
               const me= await db.query(`SELECT * FROM usr WHERE email=$1`,[email]);
                const myID= me.rows[0].id;
                const usrInChat= await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE usr_id=$1
                                                AND chat_id=$2`,[myID, chatID]);
                if(!usrInChat.rows[0]){
                    error.push("Vous n'êtes pas invité sur cette chatroom!")
                        return h.response(error).code(403);

                }

                await Chat.insertNewMessage(message, chatID,myID);
                const conv= await db.query(`SELECT * FROM chat_message
                                            WHERE to_json(ARRAY(SELECT jsonb_array_elements(users) ->> 'pseudo'))::jsonb ? $1
                                            `, [me.rows[0].pseudo]);
                return h.response(conv.rows).code(200);
            }
        
        });
        server.route({
           //add new user to chatroom
            method: 'PATCH',
            path: '/chatroom/{chatSerial}',
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
                const error=[];
               const chatSerial= request.params.chatSerial;
               const newChatter= request.payload.newChatter;
               const email= request.state.cookie.email;

                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`,[chatSerial]);
                if(!chatExists.rows[0]){
                    const error=`chat not found `
                    return h.response(error).code(404);
                }

                const chatID= chatExists.rows[0].id;
                const chatName= chatExists.rows[0].name;
                const me= await db.query(`SELECT * FROM usr 
                                            WHERE email=$1`,[email]);
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
                    //check if newchatter already in chat

                const newChatterID= newInvited.rows[0].id;
                const isInChat=await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE usr_id=$1
                                                AND chat_serial=$2;`,[newChatterID, chatSerial]);
                if(isInChat.rows[0]){
                    error.push(`user already invited`)
                    return h.response(error).code(200);   
                }
                else{
                  const pseudo= newInvited.rows[0].pseudo;
                  await Chat.addNewChatter(chatName, chatID,pseudo,newChatterID);
                const messages= await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE chat_id=$1`,[chatID]);

                return h.response(messages.rows).code(200);
                }
            }
        }
        
        });

        server.route({
            method: 'DELETE',
            path: '/chatroom/{chatSerial}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                validate: {
                    params: Joi.object({
                        chatSerial: Joi.string().alphanum().required(),
                    }),
                },
                description: 'my chat rooms',
                tags: ['api', 'chatroom', 'delete']
            },
            handler: async (request, h) => {
                const chatSerial= request.params.chatSerial;
                const email= request.state.cookie.email;
                const me= await db.query(`SELECT * FROM usr 
                                          WHERE email=$1`,[email]);
                const chatExists= await db.query(`SELECT * FROM chat 
                                                  WHERE chat_serial=$1`,[chatSerial]);
                if(!chatExists.rows[0]){
                    const error=`chat not found `
                    return h.response(error).code(404);
                }
                const chatID= chatExists.rows[0].id;
                const isInChat=await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE usr_id=$1
                                                AND chat_serial=$2;`,[me.rows[0].id, chatSerial]);
                if(!isInChat.rows[0]){
                    const error= `Vous n'êtes pas ce tchat... petit voyou`
                    return h.response(error).code(403)
                }
                else{
                    await Chat.deleteChatRoom(chatID);
                    return `tchat supprimé`
                }
            }
        });


}
}
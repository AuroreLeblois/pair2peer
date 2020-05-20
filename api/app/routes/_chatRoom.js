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
                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };
               
                // const myEmail= request.state.cookie.email;
                const me= await User.findOne(request.state.cookie);
                const chatCode= request.params.chatSerial;
                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`, [chatCode]);
                    if(!chatExists.rows[0]){
                        errorList.message.chat="Cette chatroom n'existe pas ou a été suprimée";
                     }
                     else{
                         const chatID= chatExists.rows[0].id;
                         //on verifie que le user soit dans la chatroom pour éviter les indésirables
                         const usrInChat= await db.query(`SELECT * FROM all_my_message_in_chat
                                                            WHERE usr_id=$1
                                                            AND chat_id=$2`,[me.id, chatID]);
                        if(!usrInChat.rows[0]){
                            errorList.message.invited="Vous n'êtes pas invité sur cette chatroom!";  
                        }
                        if(errorList.message.chat
                            ||errorList.message.invited) {
                              return errorList;
                          }
                          else{
                            const deleteMessage= await db.query(`SELECT * FROM usr_message_chat
                                                              WHERE chat_id=$1
                                                              AND (NOW()-"date")>'30 days'`,[chatID]);
                            if(deleteMessage.rows[0]){
                            Chat.deleteOldInChat(ChatID);
                            }
                            const messages= await db.query(`SELECT * FROM
                                                        chat_message 
                                                        WHERE chat_serial=$1`,[chatCode]);
                            return h.response(messages.rows[0]).code(200);
                        }
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
                    failAction: (request, h, err) => {
                        
                        // errors object will be the object who contains all the error messages (in french)
                        const errors = {};
                        const details = err.details;
                        // depend on each error, it will write a specific error message
                        let path = details[0].path[0];
                        let typeError = details[0].type;
                            // no need to write a specific error message if the input is empty because the constraint is set on the front side
                            if (path === 'message' && typeError === 'any.required') {
                                errors[path] = `Merci d'écrire quelque chose pour votre premier message`;
                            }
                        
                            err.output.payload.message = errors;
                            throw err;
                },
                },
                description: 'create a chat room',
                tags: ['api', 'chatroom']
            },
            handler: async function (request, h) {
                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };
                const invited= request.payload.invited;
                const message= request.payload.message;
                    const invitedInfo= await db.query(`SELECT * FROM usr WHERE pseudo=$1`,[invited]);
                    if(!invitedInfo.rows[0]){
                        errorList.message.pseudo="Nom introuvable ou invalide";
                       
                    }
                    const invitedID= invitedInfo.rows[0].id;
                    const invitedPseudo= invitedInfo.rows[0].pseudo;
                    const me= await User.findOne(request.state.cookie);

                    //si on essaye de s'inviter nous-même...
                    if(invited===me.pseudo){
                        errorList.message.psycho=`Vous ne pouvez pas vous inviter vous-même`;
                    }
                    const chatName= `${invitedPseudo} + ${me.pseudo}`;
                    //si la conversation existe déjà
                    const alreadyChatting=await db.query(`SELECT * FROM chat WHERE "name" LIKE '%${me.pseudo}%'
                                                          AND "name" LIKE '%${invited}%';`);
                    if(alreadyChatting.rows[0]){
                        errorList.message.doubleChat=`Vous discutez déjà avec cette personne. Vous pouvez trouver cette conversation dans votre messagerie.`;
                    }
                    if(errorList.message.pseudo
                      ||errorList.message.psycho
                      ||errorList.message.doubleChat) {
                        return h.response(errorList).code(400);
                    }
                    else{
                        const newChat= await db.query(`INSERT INTO chat ("name")VALUES ($1) RETURNING *`,[chatName]);
                        const ChatID= newChat.rows[0].id;
                        await Chat.insertMessage(invitedID,ChatID,me.id,message);
                                
                        const messages= await db.query(`SELECT * FROM all_my_message_in_chat 
                                                        WHERE chat_id=$1 
                                                        ORDER BY "date" ASC`,[ChatID]);
                        
                        return h.response(messages.rows[0].chat_serial).code(200);
                }
            
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
                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };
                const chatSerial= request.params.chatSerial;
               const message= request.payload.message;
                const email= request.state.cookie.email;

                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`,[chatSerial]);

                if(!chatExists.rows[0]){
                    errorList.message.chat= `Conversation introuvable ou supprimée`
                    
                }
                chatID= chatExists.rows[0].id;
             
                const me= await User.findOne(request.state.cookie);
                const usrInChat= await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE usr_id=$1
                                                AND chat_id=$2`,[me.id, chatID]);
                if(!usrInChat.rows[0]){
                    errorList.message.invited="Vous n'êtes pas invité sur cette conversation!";
                }
                if(errorList.message.chat
                    ||errorList.message.invited) {
                      return errorList;
                }
                else{

                await Chat.insertNewMessage(message, chatID,me.id);
                const conv= await db.query(`SELECT * FROM chat_message
                                            WHERE to_json(ARRAY(SELECT jsonb_array_elements(users) ->> 'pseudo'))::jsonb ? $1
                                            `,[me.pseudo]);
                return h.response(conv.rows).code(200);
                  }
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
                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };
              
               const chatSerial= request.params.chatSerial;
               const newChatter= request.payload.newChatter;

                const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`,[chatSerial]);
                if(!chatExists.rows[0]){
                    errorList.message.chat=`Conversation introuvable ou supprimée`
                }

                const chatID= chatExists.rows[0].id;
                const chatName= chatExists.rows[0].name;
                const me= await User.findOne(request.state.cookie);
                const usrInChat= await db.query(`SELECT * FROM all_my_message_in_chat
                                                 WHERE usr_id=$1;`,[me.id]);
                    
                    if(!usrInChat.rows[0]){
                        errorList.message.invited="Vous n'êtes pas invité sur cette conversation!"
                    }
                const newInvited= await db.query(`SELECT * FROM usr WHERE pseudo=$1;`,[newChatter]);
                if(!newInvited.rows[0]){
                    errorList.message.pseudo=`impossible de mettre la main sur ${newChatter}`;
                }
               
                    //check if newchatter already in chat

                const newChatterID= newInvited.rows[0].id;
                const isInChat=await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE usr_id=$1
                                                AND chat_serial=$2;`,[newChatterID, chatSerial]);
                if(isInChat.rows[0]){
                    errorList.message.alreadyHere=`Utilisateur déjà dans la conversation`;
                }
                if(errorList.message.alreadyHere
                    ||errorList.message.pseudo
                    || errorList.message.invited
                    ||errorList.message.chat) {
                      return errorList;
                  }
                  else{
                  const pseudo= newInvited.rows[0].pseudo;
                  await Chat.addNewChatter(chatName, chatID,pseudo,newChatterID);
                const messages= await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE chat_id=$1`,[chatID]);

                return h.response(messages.rows).code(200);
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
                const errorList = {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: {}
                };
                const chatSerial= request.params.chatSerial;
                const email= request.state.cookie.email;
                const me= await db.query(`SELECT * FROM usr 
                                          WHERE email=$1`,[email]);
                const chatExists= await db.query(`SELECT * FROM chat 
                                                  WHERE chat_serial=$1`,[chatSerial]);
                if(!chatExists.rows[0]){
                    errorList.message.chat=`Conversation introuvable`;
                }
                const chatID= chatExists.rows[0].id;
                const isInChat=await db.query(`SELECT * FROM all_my_message_in_chat
                                                WHERE usr_id=$1
                                                AND chat_serial=$2;`,[me.rows[0].id, chatSerial]);
                if(!isInChat.rows[0]){
                    errorList.message.notAllowed=`Vous n'êtes pas ce tchat... petit voyou`;
                }
                if(errorList.message.notAllowed
                  ||errorList.message.chat) {
                      return errorList;
                  }
                else{
                    await Chat.deleteChatRoom(chatID);
                    return `tchat supprimé`
                }
            }
        });


}
}
const db = require('../models/db');
const Joi = require('@hapi/joi');
const User = require('../models/User.model');

module.exports = {
    name: 'get and delete profile pages',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/profile',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'User\'s profile',
                tags: ['api', 'profile', 'info']
            },
            handler: async (request, h) => {

                // normally the front have access to these informations by post /login into the state
                const email = request.state.cookie.email;
                const user = await db.query(`SELECT * FROM usr_profile WHERE email = $1`, [email]);
                // no need to check if the user exist, because if the user want to access this path, he have to be logged
                const userID= user.rows[0].id;
                //delete old chat room
                const oldChat= await db.query(`SELECT * FROM all_my_message_in_chat 
                                                WHERE usr_id=$1
                                                ORDER BY date DESC;`,[userID]);
                const chatToDelete= oldChat.rows[0].date;
                const newChat= await db.query(`SELECT * FROM all_my_message_in_chat 
                                                WHERE chat_id=$1
                                                ORDER BY date ASC;`,[oldChat.rows[0].chat_id]);
                const mostRecentMes= newChat.rows[0].date;
                const interval=((chatToDelete-mostRecentMes)/1000)/60;
                const limit= 43800;
                if(interval>limit){
                    await db.query(`DELETE FROM chat WHERE id=$1;`,[oldChat.rows[0].chat_id]);
                }
                const userChatRoom= await db.query(`SELECT DISTINCT chat_serial, chat_id FROM all_my_message_in_chat WHERE usr_id=$1`,[user.rows[0].id])
                return [user.rows[0],userChatRoom.rows];
            }
        });

        server.route({
            method: 'DELETE',
            path: '/profile',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'User\'s profile',
                tags: ['api', 'profile', 'delete']
            },
            handler: async (request, h) => {
                
                // collect email through cookie and then delete the user
                const email = request.state.cookie.email;
                await User.delete(email);
                return h.response(`profil supprimé`).code(200);
            }
        });

        server.route({
            method: 'GET',
            path: '/profile/{pseudo}',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: ['user', 'admin']
                },
                description: 'Other user\'s profile page',
                tags: ['api', 'other' ,'profile'],
                validate: {
                    params: Joi.object({
                        pseudo: Joi.string().required()
                    })
                }
            },
            handler: async (request, h) => {

                // use User model to see other user profile
                const profile = await User.findOneProfile(request.params);
                
                if (profile.statusCode) {
                    // if error, send error messages
                    return h.response(profile).code(400);
                } else {
                    // if success, send user informations
                    return profile;
                };
            } 
        }); 

    }
}
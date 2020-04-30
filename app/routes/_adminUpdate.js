const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const db = require('../models/db');
const Joi = require('@hapi/joi');

module.exports = {
    name: 'admin handle profile',
    register: async (server) => {
        await server.register([vision, inert]);
           
        server.route({
                method: 'GET',
                path: '/update/profile/{speudo}',
                options: {
                    auth: {
                        strategy: 'base',
                        mode: 'required',
                        scope: ['admin']
                    },
                    description: 'User\'s profile update page for admin',
                    tags: ['api', 'profile', 'get profile']
                },
                handler: async (request, h) => {
                   
                    const pseudo= request.params.speudo;
                    const result = await db.query(`SELECT * FROM usr WHERE pseudo = $1`, [pseudo]);
                    if(!result.rows[0]){
                        return h.responde.code(400);
                    }
                    const user= result.rows[0];
                    return  user;
                    }
                
                
            });
            server.route({
                method: 'PATCH',
                path: '/update/profile/{speudo}',
                options: {
                    auth: {
                        strategy: 'base',
                        mode: 'required',
                        scope: ['admin']
                    },
                    description: ' Handle User\'s profile update page for admin',
                    tags: ['api', 'profile', 'patch profile']
                },
                handler: async (request, h) => {
                    
                        const pseudo= request.params.speudo;
                        const result = await db.query(`SELECT * FROM usr 
                                                        WHERE pseudo = $1`, [pseudo]);
                        const userID= result.rows[0].id;
                        const userRole= result.rows[0].role;
                        const changeRole= request.payload.setRole;
                        //on a l'utilisateur maintenant on change son role
                        //si le payload dit user
                        if(changeRole==='user'){
                            if(userRole!=='user'){
                                await db.query(`UPDATE usr
                                                SET role= 'user'
                                                WHERE "id"=$1`,[userID])
                            }
                        }
                        //si le payload dit admin
                        else if(changeRole==='admin'){
                            if(userRole!=='admin'){
                                await db.query(`UPDATE usr
                                                SET role= 'admin'
                                                WHERE "id"=$1`,[userID])
                            }
                        }
                        //si on veux bannir quelqu'un
                        else if(changeRole==='ban'){
                            if(userRole!=='banned'){
                                await db.query(`UPDATE usr
                                                SET role= 'banned'
                                                WHERE "id"=$1`,[userID])
                            }
                        }
                        user= await db.query(`SELECT * FROM usr WHERE "id"=$1`,[userID]);
                        return  user;
                        }
      
                
            });

            server.route({
                method: 'DELETE',
                path: '/delete/profile/{speudo}',
                options: {
                    auth: {
                        strategy: 'base',
                        mode: 'required',
                        scope: ['admin']
                    },
                    description: 'DELETE User\'s profile update page for admin',
                    tags: ['api', 'profile', 'delete profile']
                },
                handler: async (request, h) => {
                const pseudo= request.params.pseudo;
                const result = await db.query(`SELECT * FROM usr 
                                                        WHERE pseudo = $1`, [pseudo]);
                const user= result.rows[0];
                const userID= result.rows[0].id;
                if(!user){
                    return h.response.code(400);
                }
                else{
                    await db.query(`DELETE FROM usr
                                    WHERE "id"=$1`, [userID]);
                    return `Profil de ${pseudo} supprimé`
                }
                }
            });
        }
    }
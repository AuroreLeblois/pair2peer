const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const db = require('../models/db');
const Joi = require('@hapi/joi');
const Admin= require('../models/Admin.model');

module.exports = {
    name: 'admin handle profile',
    register: async (server) => {
        await server.register([vision, inert]);
           
        server.route({
                method: 'GET',
                path: '/update/profile/{pseudo}',
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
                   
                    const pseudo= request.params.pseudo;
                    const result = await db.query(`SELECT * FROM usr WHERE pseudo = $1`, [pseudo]);
                    if(!result.rows[0]){
                        return h.response.code(400);
                    }
                    const user= result.rows[0];
                    return  user;
                    }
                
                
            });
            server.route({
                method: 'PATCH',
                path: '/update/profile/{pseudo}',
                options: {
                    auth: {
                        strategy: 'base',
                        mode: 'required',
                        scope: ['admin']
                    },
                    validate: {
                        params: Joi.object({
                            pseudo: Joi.string().required()
                        }),
                        payload: Joi.object({
                            setRole: Joi.string().required()
                        })
                    },
                    description: ' Handle User\'s profile update page for admin',
                    tags: ['api', 'profile', 'patch profile']
                },
                handler: async (request, h) => {
                    const pseudo= request.params.pseudo;
                    const result = await db.query(`SELECT * FROM usr 
                                                    WHERE pseudo = $1`, [pseudo]);
                    const userID= result.rows[0].id;
                    const changeRole= request.payload.setRole;
                    
                     await Admin.setRole(changeRole,userID);   
                     const user= await db.query(`SELECT * FROM usr WHERE "id"=$1`,[userID]);
                    return  user.rows[0];
                        }
      
                
            });

            server.route({
                method: 'DELETE',
                path: '/delete/profile/{pseudo}',
                options: {
                    auth: {
                        strategy: 'base',
                        mode: 'required',
                        scope: ['admin']
                    },
                    validate: {
                        params: Joi.object({
                            pseudo: Joi.string().required()
                        }),
                    },
                    description: 'DELETE User\'s profile update page for admin',
                    tags: ['api', 'profile', 'delete profile']
                },
                handler: async (request, h) => {
                const pseudo= request.params.pseudo;
                  const info= await Admin.deleteProfile(pseudo);
                  return h.response(info).code(200);
                }
            });
        }
    }
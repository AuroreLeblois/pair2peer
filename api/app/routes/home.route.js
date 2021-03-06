const db = require('../models/db');

module.exports = {
    name: 'home pages',
    register: async (server) => {

        server.route({
            method: 'GET',
            path: '/',
            config: {
                description: 'Homepage',
                tags: ['api', 'homepage'] 
            },
            handler: async (request, h) => {
                
                // collect general informations to send to the front
                const lang = await db.query('SELECT * FROM all_language');
                const localisation = await db.query('SELECT * FROM all_country_city');
                const itLang = await db.query('SELECT * FROM all_it_language');
                const maxUser = await db.query('SELECT COUNT(*) AS count FROM usr_profile');

                const info = {};
                info.language = lang.rows[0].name;
                info.it_language = itLang.rows[0].name;
                info.maxUser = maxUser.rows[0].count;
                info.localisation = localisation.rows;

                return info;
            }
        });

    }
}
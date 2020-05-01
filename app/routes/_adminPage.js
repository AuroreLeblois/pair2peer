const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const pug = require('pug');
const db = require('../models/db');

module.exports = {
    name: 'admin pages',
    register: async (server) => {
        await server.register([vision, inert]);


        server.route({
            method: 'GET',
            path: '/admin',
            options: {
                auth: {
                    strategy: 'base',
                    mode: 'required',
                    scope: 'admin'
                }
            },
            handler: async (request, h) => {
                const countries = await db.query('SELECT country, count(*) FROM usr_detail GROUP BY country');
                const country = countries.rows;

                const cities = await db.query('SELECT city, count(*) FROM usr_detail GROUP BY city');
                const city = cities.rows;

                const langs= await db.query(`SELECT * FROM all_language`);
                const lang= langs.rows;

                const itLangs= await db.query(`SELECT * FROM all_it_language`);
                const itLang= itLangs.rows;

                return {country, city, lang, itLang};
            }
        });
    }
}
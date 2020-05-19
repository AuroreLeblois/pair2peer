const db = require('./db');

module.exports = class Admin {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };

    // ####               ####
    // ##   Add method      ##
    // ####               ####
    static async add (query) {

        let language = await db.query('SELECT * FROM all_language');
        let it_language = await db.query('SELECT * FROM all_it_language');

        // if key doesn't have any value, the pair key-value will be remove of the object
        for (let item in query) {
            if (!query[item]) {
                delete query[item]
            } else {
                query[item] = query[item].toLowerCase()
            }
        }

        const keys = Object.keys(query);
        const values = Object.values(query);

        // if key doesn't have any value, the pair key-value will be remove of the object
        for (let index = 0; index < keys.length; index++) {
            // it will check if the it_language is already here into the database
            if (keys[index] === 'it_language' && !it_language.rows[0].name.includes(values[index])) {
                await db.query(`INSERT INTO it_lang (name) VALUES ('${values[index]}')`)
                // if will check if the language is already here into the database
            } else if (keys[index] === 'language' && !language.rows[0].name.includes(values[index])) {
                await db.query(`INSERT INTO lang (name) VALUES ('${values[index]}')`)
            }
        };

        // we have to call again to visualize the increase
        language = await db.query('SELECT * FROM all_language');
        it_language = await db.query('SELECT * FROM all_it_language');

        // it will prepare the response to the front
        const info = {};
        info.language = language.rows[0].name;
        info.it_language = it_language.rows[0].name

        return info;
    };

    // ####               ####
    // ##   Add method      ##
    // ####               ####
    static async deleteProfile(pseudo) {
        const result = await db.query(`SELECT * FROM usr 
                                        WHERE pseudo = $1`, [pseudo]);
                const user= result.rows[0];
                const userID= result.rows[0].id;
                if(!user){
                    return `profil introuvable`;
                }
                else{
                    await db.query(`DELETE FROM usr
                                    WHERE "id"=$1`, [userID]);
                    return `profil supprimé`;
                }
    };
    // ####                    ####
    // ##   Add method      ##
    // ####               ####
    static async setRole(changeRole, userID) {

        //on a l'utilisateur maintenant on change son role
        //si le payload dit user   
        await db.query(`UPDATE usr
                        SET role= $1
                        WHERE "id"=$2`,[changeRole,userID])
              
        return 'ok'
        };
}
const db = require('./db');

module.exports = class User {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };

    // ####               ####
    // ##   FindBy method   ##
    // ####               ####
    static async findBy(pseudo) {

        // return all user's chat rooms with their messages to the front
        const chatRooms = await db.query(`SELECT * FROM chat_message WHERE "users"@> '[{"pseudo":"${pseudo}"}]'`);
        return chatRooms.rows;
    }
};
const db = require('./db');

module.exports = class Mapping {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };

    // ####               ####
    // ##   findAll method  ##
    // ####               ####
    static async findAll() {

        const usersMap = await db.query('SELECT * FROM usr_map');
        return usersMap.rows;
    }
}
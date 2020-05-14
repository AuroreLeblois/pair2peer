const db = require('./db');

module.exports = class Chat {

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
    
    };
};
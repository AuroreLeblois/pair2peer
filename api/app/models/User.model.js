const db = require('./db');
const bcrypt = require('bcrypt');
const Wreck = require('@hapi/wreck');

module.exports = class User {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };

    // ####               ####
    // ##   Login method    ##
    // ####               ####
    static async login(email, password) {
                
        // test if the email exist
        const visitor = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
        const user = visitor.rows[0];

        // build a formated object error message like native Hapi
        const errorList = {
            statusCode: 400,
            error: 'Bad Request',
            message: {}
        };

        // create specific error message depend on the data
        if (!user) {
            errorList.message.errorEmail = 'Cet email n\'existe pas';
            errorList.message.errorPassword = 'Mauvais mot de passe';
        };
        if (user && !await bcrypt.compare(password, user.password)) {
            errorList.message.errorPassword = 'Mauvais mot de passe';
        };
        
        // return error message if exists 
        if (errorList.message.errorEmail
            || errorList.message.errorPassword) {
            return errorList;
        }

        // send all informations about the user logged for the front in react
        const userInfos = await db.query(`SELECT * FROM usr_profile WHERE email = $1`, [email]) 
        return userInfos.rows[0];
    };

    // ####               ####
    // ##   Signup method   ##
    // ####               ####
    static async signup(email, pseudo, password, country, city, remote) {

        const registered = await db.query('SELECT pseudo FROM usr WHERE email = $1', [email]);
        const nameRegistered = await db.query('SELECT pseudo FROM usr');

        // use extern API to find coordinates
        const api = await Wreck.get(`https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}&apiKey=${process.env.APIKEY}`, {
            json: true
        });
        
        // build an error object who will contain all the specific error messages based on Hapi native error message
        const errorList = {
            statusCode: 400,
            error: 'Bad Request',
            message: {}
        };

        // check if the address'input goes wrong
        if (!api.payload.items[0]) {
            errorList.message.wrongAddress = 'Le pays ou la ville n\'existe pas'
        };

        // check the errors that I cannot verify inside the failAction
        if (registered.rows[0]) {
            errorList.message.emailUsed = 'Cet email existe déjà';
        };

        for (let registered of nameRegistered.rows) {
            if (pseudo.toLowerCase() === registered.pseudo.toLowerCase()) {
                errorList.message.usernameUsed = 'Ce nom d\'utilisateur existe déjà';
            }
        };

        if (errorList.message.usernameUsed
            || errorList.message.emailUsed
            || errorList.message.wrongAddress) {
            return errorList;
        };

        // collect the address and coordinates through the API
        const { address, position } = api.payload.items[0];

        // hash the password and add salt to prevent hacking
        const hashPassword = bcrypt.hashSync(password, 10);

        // create a new user
        const newRegistered = await db.query('SELECT * FROM add_usr($1, $2, $3)',
        [email, pseudo, hashPassword]);

        const userId = newRegistered.rows[0].id;

        // bind some descriptions to the new user
        const newRegisteredDetail = await db.query('SELECT * FROM add_usr_detail($1, $2, $3, $4, $5, $6)', [userId, address.countryName.toLowerCase(), address.city.toLowerCase(), position.lat, position.lng, remote]);

        // collect user informations to send to the front
        const newUser = await db.query('SELECT * FROM usr_profile WHERE id = $1', [userId]);

        return newUser.rows[0];
    }
};
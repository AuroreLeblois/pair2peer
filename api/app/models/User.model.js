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
        // I have to pass through usr instead of usr_profile to compare the password
        const visitor = await db.query(`SELECT * FROM usr WHERE email = $1`, [email]);
        const theUser = visitor.rows[0];

        // build a formated object error message like native Hapi
        const errorList = {
            statusCode: 400,
            error: 'Bad Request',
            message: {}
        };

        // create specific error message depend on the data
        if (!theUser) {
            errorList.message.errorEmail = 'Cet email n\'existe pas';
            errorList.message.errorPassword = 'Mauvais mot de passe';
        };
        if (theUser && !await bcrypt.compare(password, theUser.password)) {
            errorList.message.errorPassword = 'Mauvais mot de passe';
        };
        
        // return error message if exists 
        if (errorList.message.errorEmail
            || errorList.message.errorPassword) {
            return errorList;
        }

        // send all informations about the user logged for the front in react
        const userInfos = await db.query(`SELECT * FROM usr_profile WHERE email = $1`, [email]);
        // add chat message
        const chatInfos = await db.query(`
            SELECT * FROM chat_message
            WHERE to_json(ARRAY(SELECT jsonb_array_elements(users) ->> 'pseudo'))::jsonb ? $1
        `, [theUser.pseudo]);
        
        // create user object who will contain 2 objects (informations about the user and his messages)
        const user = {
            info: userInfos.rows[0],
            inbox: chatInfos.rows
        };
        
        return user;
    };

    // ####               ####
    // ##   Signup method   ##
    // ####               ####
    static async signup(email, pseudo, password, country, city, remote, captchaValue) {

        const registered = await db.query('SELECT pseudo FROM usr WHERE email = $1', [email]);
        const nameRegistered = await db.query('SELECT pseudo FROM usr');

        // use extern API to find coordinates
        const api = await Wreck.get(`https://geocode.search.hereapi.com/v1/geocode?q=${country}+${city}&apiKey=${process.env.APIKEY}`, {
            json: true
        });

        // use extern API to implement captcha to increase security
        const captcha = await Wreck.get(`https://google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${captchaValue}`, {
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

        // check if the captcha is valid
        if (!captcha.payload.success) {
            errorList.message.wrongCaptcha = 'Le captcha n\'est pas valide, veuillez réessayer'
        }

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
            || errorList.message.wrongAddress
            || errorList.message.wrongCaptcha) {
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
    };

    // ####               ####
    // ##   Delete method   ##
    // ####               ####
    static async delete(email) {

        await db.query('DELETE FROM usr WHERE email = $1', [email]);
    };

    // ####               ####
    // ##   FindOne method  ##
    // ####               ####
    static async findOne(info) {

        let user;
        if (info.pseudo) {
            user = await db.query(`SELECT * FROM usr WHERE pseudo = $1`, [info.pseudo]);
        } else if (info.email) {
            user = await db.query(`SELECT * FROM usr WHERE email = $1`, [info.email]);
        }

        const error = {
            statusCode: 400,
            error: 'Bad request',
            message: {}
        };

        // if the user doesn't exist, it will return an error
        if (!user.rows[0]) {
            error.message.unknownUser = 'Utilisateur introuvable';
            return error;
        } else {
            return user.rows[0]
        } 
    };

    // ####               ####
    // ##   FindOneProfile  ##
    // ####    method     ####
    static async findOneProfile(info) {

        let user;
        if (info.pseudo) {
            user = await db.query(`SELECT * FROM usr_profile WHERE pseudo = $1`, [info.pseudo]);
        } else if (info.email) {
            user = await db.query(`SELECT * FROM usr_profile WHERE email = $1`, [info.email]);
        }

        const error = {
            statusCode: 400,
            error: 'Bad request',
            message: {}
        };

        // if the user doesn't exist, it will return an error
        if (!user.rows[0]) {
            error.message.unknownUser = 'Profil introuvable';
            return error;
        } else {
            return user.rows[0]
        }  
    }

};
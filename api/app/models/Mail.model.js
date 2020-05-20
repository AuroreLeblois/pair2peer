const db = require('./db');
const nodemailer = require('nodemailer');

// we are the transporter, we inform some informations to nodemailer
const transporter = nodemailer.createTransport( {
    service: "Gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    }
});

module.exports = class Mail {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };

    // ####               ####
    // ##   Mailer method   ##
    // ####               ####
    static async mailer(email) {

        // we send an email through our information set earlier on transporter
        const info = await transporter.sendMail({
            from: 'Team Pair2peer <pair2peer.no.reply@gmail.com>',
            to: email,
            subject: "Activation de Compte",
            html: `
                <h2> Bienvenue chez Pair2peer </h2>
                <p>Il ne vous reste plus qu'à activer votre compte pour profiter pleinement du site.</p>
                <p>Cliquez <a href="http://localhost:3000/activation/user/${email}">ici</a> pour activer votre compte.</p>`
        });

        console.log("Message sent: %s ", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    };

    // ####               ####
    // ## Activation method ##
    // ####               ####
    static async activation(email) {

        // it will activate the account
        await db.query(`UPDATE usr SET "status" = 'actif' WHERE email = $1`, [email]);
    };

    // ####               ####
    // ##   Mailer Request  ##
    // ####    method     ####
    static async mailerRequest(name, email, message) {

        // we send the visitor's request to our mail
        const info = await transporter.sendMail({
            from: email,
            to: 'pair2peer@gmail.com',
            subject: `Requête à la demande de ${name} - ${email}`,
            text: message
        });

        console.log("Message sent: %s ", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    };

}
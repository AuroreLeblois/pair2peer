const db = require('./db');
const nodemailer = require('nodemailer');

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

        let transporter = nodemailer.createTransport( {
            service: "Gmail",
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        let info = await transporter.sendMail({
            from: 'Team Pair2peer <pair2peer.no.reply@gmail.com>',
            to: email,
            subject: "Activation de Compte",
            text: "Bienvenue chez Pair2peer, il ne vous reste plus qu'à activer votre compte pour profiter pleinement du site.",
            html: `<p>Cliquez <a href="http://localhost:3000/activation/user/${email}">ici</a> pour activer votre compte.</p>`
        });

        console.log("Message sent: %s ", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    };

    // ####               ####
    // ## Activation method ##
    // ####               ####
    static async activation(email) {

        await db.query(`UPDATE usr SET "status" = 'actif' WHERE email = $1`, [email]);
    };

}
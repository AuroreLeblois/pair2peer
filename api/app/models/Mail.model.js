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
        const sendToVisitor = await transporter.sendMail({
            from: 'Team Pair2peer <pair2peer@gmail.com>',
            to: email,
            subject: "Activation de Compte",
            html: `
                <h2> Bienvenue chez Pair2peer </h2>
                <p>Il ne vous reste plus qu'à activer votre compte pour profiter pleinement du site.</p>
                <p>Cliquez <a href="http://ec2-100-25-41-105.compute-1.amazonaws.com:3000/activation/user/${email}">ici</a> pour activer votre compte.</p>`
        });

        console.log("Message sent to visitor: %s ", sendToVisitor.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendToVisitor));
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

        // we send the visitor's request to pair2peer mail
        const sendToUs = await transporter.sendMail({
            from: email,
            to: 'pair2peer@gmail.com',
            subject: `Requête à la demande de ${name} - ${email}`,
            text: message
        });

        console.log("Message sent to us: %s ", sendToUs.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendToUs));

         // we send an email through our information set earlier on transporter to inform that we received the request
         const sendToVisitor = await transporter.sendMail({
            from: 'Team Pair2peer <pair2peer@gmail.com>',
            to: email,
            subject: "Réception du message",
            html: `
                <p>Nous avons bien reçu votre message et reviendrons vers vous aussi tôt que possible.
                <br/>
                <br/>
                Cordialement.
                <br/>
                L'équipe Pair2peer !<p>`
        });

        console.log("Message sent to visitor: %s ", sendToVisitor.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendToVisitor));
    };

}
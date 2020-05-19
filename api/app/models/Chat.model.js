const db = require('./db');

module.exports = class Chat {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };



     // ####                          ####
    // ##   create chat method      ##
    // ####                           ####
    static async insertMessage(invitedID,ChatID,myID,message) {
        await db.query(`INSERT INTO usr_message_chat ( usr_id, chat_id, "date") 
        VALUES($1,$2, NOW())`,[invitedID, ChatID]);

        await db.query(`INSERT INTO usr_message_chat ( usr_id, chat_id,script, "date") 
        VALUES($1,$2, $3, NOW())`,[myID, ChatID, message]);
    };

     // ####                          ####
    // ##   post message method      ##
    // ####                           ####
    static async insertNewMessage(message, chatID,myID) {
        await db.query(`INSERT INTO usr_message_chat("date",script,usr_id,chat_id) VALUES(NOW(),$1,$2,$3);`,[message,myID,chatID]);
    };
    // ####                          ####
    // ##   post message method      ##
    // ####                           ####
    static async addNewChatter(chatName, chatID,pseudo,newChatterID) {
        await db.query(`UPDATE chat 
                        SET name='${chatName} + ${pseudo}'
                        WHERE id=$1`,[chatID]);
        await db.query(`INSERT INTO usr_message_chat ("date", usr_id, chat_id) 
                        VALUES(NOW(),$1,$2)`,[newChatterID, chatID]);
    };
    // ####                          ####
    // ##   delete old message method      ##
    // ####                           ####
    static async deleteOldInChat(chatID) {
        await db.query(`DELETE FROM usr_message_chat
                        WHERE chat_id=$1
                        AND (NOW()-"date")>'30 days`,[chatID]);
    };
    // ####                          ####
    // ##   delete chat method      ##
    // ####                           ####
    static async deleteChatRoom(chatID) {
        await db.query(`DELETE FROM usr_message_chat 
                        WHERE chat_id=$1;`,[chatID]);
    };
};
 
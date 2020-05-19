const db = require('./db');

module.exports = class Chat {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };



     // ####                          ####
    // ##   simple delete method      ##
    // ####                           ####
    // static async deleteChat(info) {
    //     await db.query(`DELETE FROM usr_message_chat WHERE chat_id=$1;`,[info.id]);
    // };
    // ####                          ####
    // ##   simple delete method      ##
    // ####                           ####
    static async deleteChat(chatID) {
        await db.query(`DELETE FROM usr_message_chat WHERE chat_id=$1;`,[chatID]);
        return 'ok'
    };
    
     // ####                          ####
    // ##   Just delete messages      ##
    // ####                           ####
    static async deleteOld(chat) {
        const deleteMessage= await db.query(`SELECT * FROM usr_message_chat
                                            WHERE chat_id=$1
                                            AND (NOW()-"date")>'30 days'`,[chat]);
        if(deleteMessage.rows[0]){
                await db.query(`DELETE FROM usr_message_chat
                                WHERE chat_id=$1
                                AND (NOW()-"date")>'30 days'`,[chat]);
        }
    };

    // ####               ####
    // ##   Find One      ##
    // ####               ####
    static async findChatRoom(chatSerial) {
        let error=[];
       const chatExists= await db.query(`SELECT * FROM chat WHERE chat_serial=$1`,[chatSerial]);
            return chatExists.rows;
        
    };

    // ####                    ####
    // ##   Verify method      ##
    // ####                    ####
   
    static async areYouInvited(user,chat) {
        const usrInChat= await db.query(`SELECT * FROM all_my_message_in_chat
                                        WHERE usr_id=$1
                                        AND chat_id=$2`,[user, chat]);
        return usrInChat
        
    };

    // ####                                  ####
    // ##   delete old messages method      ##
    // ####                                   ####
    static async deleteAndReturnMessages(userID) {
        const oldChat= await db.query(`SELECT * FROM all_my_message_in_chat 
                                        WHERE usr_id=$1
                                        ORDER BY date DESC;`,[userID]);
        const chatToDelete= oldChat.rows[0].date;
        const newChat= await db.query(`SELECT * FROM all_my_message_in_chat 
                                        WHERE chat_id=$1
                                        ORDER BY date ASC;`,[oldChat.rows[0].chat_id]);
        const mostRecentMes= newChat.rows[0].date;
        const interval=((chatToDelete-mostRecentMes)/1000)/60;
        const limit= 43800;
        if(interval>limit){
            await db.query(`DELETE FROM chat WHERE id=$1;`,[oldChat.rows[0].chat_id]);
        }
        const userChatRoom= await db.query(`SELECT DISTINCT chat_serial, chat_id 
                                            FROM all_my_message_in_chat 
                                            WHERE usr_id=$1`,[user.rows[0].id]);
        return userChatRoom.rows;
    
    };
};
 
const db = require('./db');

module.exports = class Admin {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };

    // ####               ####
    // ##   pass method      ##
    // ####               ####
    static async passwordUpdate(hashPassword,userID) {
        await db.query(`UPDATE usr
                        SET "password"= $1
                        WHERE "id"=$2`,[hashPassword, userID]);
    };

    // ####               ####
    // ##   pseudo method      ##
    // ####               ####
    static async pseudoUpdate(pseudo,userID) {
        await db.query(`UPDATE usr SET pseudo=$1 WHERE "id"=$2;`,[pseudo,userID]);
    };

    // ####               ####
    // ##   city/country method      ##
    // ####               ####
    static async localisationUpdate(city,country,latitude,longitude,userID) {
        await db.query(`UPDATE usr_detail
                        SET "city"=$1, 
                        "country"=$2,
                        latitude=$3,
                        longitude=$4
                        WHERE usr_id=$5`,
                        [city, country,latitude,
                        longitude,userID]);
    };
    // ####               ####
    // ##   detail method      ##
    // ####               ####
    static async detailUpdate(remote, description, 
                                    disponibility,linkedin_link,
                                    facebook_link,github_link, picture,
                                    userID) {
        await db.query(`UPDATE usr_detail
                        SET "remote"=$1,
                        description=$2,
                        disponibility=$3,
                        linkedin_link=$4,
                        facebook_link=$5,
                        github_link=$6,
                        picture=$7
                        WHERE usr_id=$8`,
                        [remote, description, 
                        disponibility,linkedin_link,
                        facebook_link,github_link, picture,
                        userID]);
    };
    // ####               ####
    // ##   detail method      ##
    // ####               ####
    static async detailInsert(city, country, remote,latitude, longitude, disponibility, userID,description, disponibility, linkedin_link, facebook_link,github_link) {
            await db.query(`INSERT INTO usr_detail ("city", "country", "remote", latitude, longitude, usr_id,description,disponibility,linkedin_link,facebook_link, github_link )
            VALUES ($1 , $2 , $3 , $4 , $5,$6,$7,$8,$9,$10,$11);`
            ,[city, country, remote,latitude, longitude, disponibility, userID,description, disponibility, linkedin_link, facebook_link,github_link]);
};

    // ####               ####
    // ##   delete it_lang method      ##
    // ####               ####
    static async deleteIT(userID,itLangID) {
        await db.query(`DELETE FROM usr_knows_it_lang
                        WHERE usr_id=$1
                        AND it_lang_id=$2;`,
                        [userID,itLangID]);
    };
    // ####               ####
    // ##   insert it_lang method      ##
    // ####               ####
    static async insertIT(userID, itLangID, itLevel, itSearch) {
    await db.query(`INSERT INTO usr_knows_it_lang (usr_id, it_lang_id, "level", search) 
                                    VALUES ($1, $2, $3, $4)`,
                                    [userID, itLangID, itLevel, itSearch]);
    };

    // ####               ####
    // ##   update it_lang method      ##
    // ####               ####
    static async updateIT(itLevel, itSearch,userID, itLangID ) {
        db.query(`UPDATE usr_knows_it_lang 
                    SET "level"= $1, search=$2
                    WHERE usr_id=$3
                    AND it_lang_id =$4`,
                    [itLevel,itSearch, userID,itLangID]);
        };

    // ####               ####
    // ##   delete lang method      ##
    // ####               ####
    static async deleteLang(userID,langID) {
        await db.query(`DELETE FROM usr_speaks_lang
                        where usr_id=$1
                        AND lang_id=$2;`,[userID,langID]);
    };
    // ####               ####
    // ##   delete lang method      ##
    // ####               ####
    static async insertLang(userID,langID) {
    await db.query(`INSERT INTO usr_speaks_lang (usr_id, lang_id) 
                                        VALUES ($1, $2);`,[userID,langID]);
    };
};
const db = require('./db');

module.exports = class Search {

    constructor(rawData) {
        Object.entries(rawData).forEach(entry => {
            const [key, value] = entry;
            this[key] = value;
        });
    };

    // ####               ####
    // ##   Filter method   ##
    // ####               ####
    static async filter(query, pageNb, userNb) {

        // it will replace all special characters to struggle against SQL injection
        const regex = /[*;$><&|?@="]/g;

        // first filter, if key doesn't have any value, the pair key-value will be remove of the object
        for (let item in query) {
            if (!query[item]) {
                delete query[item]
            } else {
                query[item] = query[item].toString().toLowerCase().replace(regex, "%20");
            }
        }
        
        const keys = Object.keys(query);
        const values = Object.values(query);

        let filter = values.map(( value, index ) => {
            // value = protec(value);
            if (keys[index] === 'language') {
                // example : "language" ? 'français'
                return `"${keys[index]}" ? '${value}' `;
            } else if (keys[index] === 'it_language') {
                // example : it_language @> '[{ "name": "javascript", "search": true }]'
                return `${keys[index]} @> '[{"name":"${value}", "search":true}]' `;
            } else if (keys[index] === 'level') {
                // exemple : it_language @> '[{ "name": "previous it_language.name", "level": 1 }]'
                // add specific security to itName because values[index -1] doesn't have any protection
                return `it_language @> '[{"name":"${values[index - 1]}", "level":${value}}]' `;
            } else if (keys[index] === 'remote') {
                // example : remote = true/ false
                return `${keys[index]} = ${value} `;
            } else {
                // it will build the query from other input like country, city etc
                return `${keys[index]} = '${value}' `;
            }
        }).join('AND ');

        const info = {};

        function infoDetail (maxUser, maxPage, users) {
            info.maxUser = maxUser.rows[0].count;
            info.maxPage = maxPage.rows[0].count;
            info.users = users.rows;
        }

        // depend to the filter, it will send the informations
        if (!filter) {
            const maxUser = await db.query('SELECT COUNT(*) AS count FROM usr_profile');
            const maxPage = await db.query('SELECT CEILING(COUNT(*)/$1::float) AS count FROM usr_profile', [userNb]);

            const user = await db.query(`
                SELECT *
                FROM (SELECT
                        ROW_NUMBER() OVER (ORDER BY "id"),
                        *
                    FROM usr_profile) as byrow
                WHERE "row_number" > $1 * ($2 - 1)
                ORDER BY "row_number" ASC
                LIMIT $1`,
                [userNb, pageNb]
            );

            infoDetail(maxUser, maxPage, user);
            return info;
        } else {
            const maxUser = await db.query(`
                SELECT COUNT(*) AS count FROM (
                    SELECT ROW_NUMBER() OVER (ORDER BY "id"), * FROM usr_profile 
                    WHERE ${filter}
                ) as count_user;`
            );
            const maxPage = await db.query(`
                SELECT CEILING(COUNT(*)/$1::float) AS count FROM (
                    SELECT ROW_NUMBER() OVER (ORDER BY "id"), * FROM usr_profile 
                    WHERE ${filter}
                ) as count_max_page;`,
                [userNb]
            );

            const user = await db.query(`
                SELECT *
                FROM (SELECT
                        ROW_NUMBER() OVER (ORDER BY "id"),
                        *
                    FROM usr_profile
                    WHERE ${filter}) as byrow
                WHERE "row_number" > $1 *($2 - 1)
                ORDER BY "row_number" ASC
                LIMIT $1`,
                [userNb, pageNb]
            );

            infoDetail(maxUser, maxPage, user);
            return info;
        }
    }
};
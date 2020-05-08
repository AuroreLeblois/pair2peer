-- Deploy apotestb:views to pg

BEGIN;

-- XXX Add DDLs here.
CREATE VIEW usr_map AS	
    SELECT
        usr.id,
        usr.pseudo, 
        usr_detail.country,
        usr_detail.city,
        usr_detail.latitude,
        usr_detail.longitude,
        usr_detail.remote,
        usr_detail.description, 
        usr_detail.picture,
        jsonb_agg(DISTINCT lang.name) "language",
        jsonb_agg(DISTINCT jsonb_build_object(
            'name', it_lang.name,
            'level', usr_knows_it_lang.level,
            'search', usr_knows_it_lang.search
        )) AS it_language
    FROM usr
	LEFT JOIN usr_detail ON usr.id = usr_detail.usr_id
    LEFT JOIN usr_speaks_lang ON usr.id = usr_speaks_lang.usr_id
    LEFT JOIN lang ON usr_speaks_lang.lang_id = lang.id
    LEFT JOIN usr_knows_it_lang ON usr.id = usr_knows_it_lang.usr_id
    LEFT JOIN it_lang ON usr_knows_it_lang.it_lang_id = it_lang.id
    GROUP BY 
		usr.id,
		usr_detail.country,
		usr_detail.city,
		usr_detail.remote,
		usr_detail.description,
		usr_detail.picture,
        usr_detail.latitude,
        usr_detail.longitude;


CREATE VIEW usr_profile AS
    SELECT
        usr.id,
        usr.pseudo, 
		usr.email,
		usr_detail.picture,
		usr_detail.country,
		usr_detail.city,
        usr_detail.latitude,
        usr_detail.longitude,
		usr_detail.remote,
		usr_detail.birthyear,
		usr_detail.experience,
        usr_detail.description,
        usr_detail.disponibility, 
        jsonb_agg(DISTINCT lang.name) "language",
        jsonb_agg(DISTINCT jsonb_build_object(
            'name', it_lang.name,
            'level', usr_knows_it_lang.level,
            'search', usr_knows_it_lang.search
        )) AS it_language
    FROM usr
	LEFT JOIN usr_detail ON usr.id = usr_detail.usr_id
    LEFT JOIN usr_speaks_lang ON usr.id = usr_speaks_lang.usr_id
    LEFT JOIN lang ON usr_speaks_lang.lang_id = lang.id
    LEFT JOIN usr_knows_it_lang ON usr.id = usr_knows_it_lang.usr_id
    LEFT JOIN it_lang ON usr_knows_it_lang.it_lang_id = it_lang.id
    GROUP BY 
		usr.id,
		usr_detail.country,
		usr_detail.city,
		usr_detail.remote,
		usr_detail.description,
		usr_detail.picture,
		usr_detail.birthyear,
		usr_detail.experience,
        usr_detail.latitude,
        usr_detail.longitude,
        usr_detail.disponibility;


CREATE VIEW all_it_language AS (
	SELECT jsonb_agg(DISTINCT "name") AS "name"
	FROM it_lang
);

CREATE VIEW all_language AS (
	SELECT jsonb_agg(DISTINCT "name") AS "name"
	FROM lang
);

CREATE VIEW all_country_city AS (
	SELECT DISTINCT country, jsonb_agg(DISTINCT city) AS city
	FROM usr_detail
	GROUP BY country
);
CREATE view all_my_message_in_chat AS
    SELECT
    usr_message_chat.script as "message",
    usr_message_chat.date,
    usr_message_chat.usr_id as"usr_id",
    usr_message_chat.chat_id,
    chat_serial,
	pseudo
    FROM usr_message_chat
    JOIN chat ON chat.id= usr_message_chat.chat_id
	JOIN usr ON usr_id=usr.id
    GROUP BY chat_id,
    chat_serial,
    usr_message_chat.date,
    "message",
    usr_id,
	pseudo;

COMMIT;

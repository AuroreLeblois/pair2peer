-- Deploy apotheosePP:message_view to pg

BEGIN;

-- XXX Add DDLs here.
CREATE VIEW chat_message AS
    SELECT
        chat.chat_serial,
        jsonb_agg(distinct jsonb_build_object(
            'pseudo', usr.pseudo,
            'picture', usr_detail.picture
        )) users,
        jsonb_agg(jsonb_build_object(
            'pseudo', usr.pseudo,
            'date', usr_message_chat.date,
            'content', usr_message_chat.script
        ) ORDER BY usr_message_chat.date ASC
        ) messages
    FROM usr
    JOIN usr_message_chat ON usr.id = usr_message_chat.usr_id
    JOIN chat ON usr_message_chat.chat_id = chat.id
    JOIN usr_detail ON usr.id = usr_detail.usr_id
    GROUP BY chat.chat_serial;

COMMIT;

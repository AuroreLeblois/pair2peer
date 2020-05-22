-- Deploy apotheosePP:domaines to pg

BEGIN;

CREATE DOMAIN chat_room_serial AS text
CHECK (VALUE ~* '^[0-9a-z]{6}$');

ALTER TABLE chat ALTER chat_serial TYPE chat_room_serial;

CREATE VIEW all_my_message_in_chat AS
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
    GROUP BY
        chat_id, chat_serial,
        usr_message_chat.date,
        "message", usr_id,
        pseudo;

COMMIT;

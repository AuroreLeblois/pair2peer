-- Revert apotheosePP:domaines from pg

BEGIN;

DROP VIEW all_my_message_in_chat;
ALTER TABLE chat ALTER chat_serial TYPE text;
DROP DOMAIN chat_room_serial;

COMMIT;

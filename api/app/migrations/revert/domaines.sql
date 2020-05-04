-- Revert apotheosePP:domaines from pg

BEGIN;

ALTER TABLE chat ALTER chat_serial TYPE text;
DROP DOMAIN chat_room_serial;

COMMIT;

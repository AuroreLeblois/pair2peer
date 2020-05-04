-- Deploy apotheosePP:domaines to pg

BEGIN;

CREATE DOMAIN chat_room_serial AS text
CHECK (VALUE ~* '^[0-9a-f]{6}$');

ALTER TABLE chat ALTER chat_serial TYPE chat_room_serial;

COMMIT;

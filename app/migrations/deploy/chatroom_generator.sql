-- Deploy apotheosePP:chatroom_generator to pg

BEGIN;

CREATE SEQUENCE chat_room_seq OWNED BY chat.chat_serial;

ALTER TABLE chat ALTER chat_name SET DEFAULT lpad(to_hex(nextval('chat_room_seq'::regclass)), 6, '0');

COMMIT;

-- Revert apotheosePP:chatroom_generator from pg

BEGIN;

DROP SEQUENCE chat_room_seq CASCADE;

COMMIT;

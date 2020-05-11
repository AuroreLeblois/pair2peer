-- Revert apotheosePP:message_view from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW chat_message;

COMMIT;

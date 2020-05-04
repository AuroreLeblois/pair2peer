-- Revert apotestb:tables from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE
    usr_speaks_lang,
    usr_knows_it_lang,
    usr_message_chat,
    disponibility,
    it_lang,
    lang,
    chat,
    usr_detail,
    usr;

COMMIT;

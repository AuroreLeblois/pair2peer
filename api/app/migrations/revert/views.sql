-- Revert apotestb:views from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW
    usr_profile,
    usr_map,
    all_language,
    all_it_language,
    all_country_city,
    all_my_message_in_chat;

COMMIT;

-- Revert apotestb:views from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW
    usr_map,
    usr_profile,
    all_language,
    all_it_language,
    all_country_city;

COMMIT;

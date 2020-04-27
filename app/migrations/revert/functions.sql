-- Revert apotestb:functions from pg

BEGIN;

-- XXX Add DDLs here.
DROP FUNCTION
    add_usr,
    add_usr_detail;

COMMIT;

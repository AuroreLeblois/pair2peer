-- Revert apotheosePP:update_tables from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE usr_detail ADD COLUMN experience TEXT;

COMMIT;

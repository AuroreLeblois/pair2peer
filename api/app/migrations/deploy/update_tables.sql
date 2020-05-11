-- Deploy apotheosePP:update_tables to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE usr_detail DROP COLUMN experience;

COMMIT;

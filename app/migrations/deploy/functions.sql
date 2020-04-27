-- Deploy apotestb:functions to pg

BEGIN;

-- XXX Add DDLs here.
CREATE FUNCTION add_usr (em text, pse text, pass text) RETURNS usr AS $$
	INSERT INTO usr (email, pseudo, "password") VALUES
	(em, pse, pass)
	RETURNING *
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION add_usr_detail (uid int, coun text, cit text, rem bool) RETURNS usr_detail AS $$
	INSERT INTO usr_detail (usr_id, country, city, remote) VALUES
	(uid, coun, cit, rem)
	RETURNING *
$$ LANGUAGE SQL STRICT;

COMMIT;

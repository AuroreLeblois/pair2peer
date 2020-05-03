-- Deploy apotestb:functions to pg

BEGIN;

-- XXX Add DDLs here.
CREATE FUNCTION add_usr (em TEXT, pse TEXT, pass TEXT) RETURNS usr AS $$
	INSERT INTO usr (email, pseudo, "password") VALUES
	(em, pse, pass)
	RETURNING *
$$ LANGUAGE SQL STRICT;


CREATE FUNCTION add_usr_detail ("uid" INT, coun TEXT, cit TEXT, lat DOUBLE PRECISION, long DOUBLE PRECISION, rem BOOL) RETURNS usr_detail AS $$
	INSERT INTO usr_detail (usr_id, country, city, latitude, longitude, "remote") VALUES
	("uid", coun, cit, lat, long, rem)
	RETURNING *
$$ LANGUAGE SQL STRICT;

COMMIT;

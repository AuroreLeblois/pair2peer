-- Deploy apotestb:tables to pg

BEGIN;

-- XXX Add DDLs here.
CREATE TABLE usr (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pseudo TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user'
);

CREATE TABLE usr_detail (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    picture TEXT,
    birthyear DATE,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    "remote" BOOLEAN NOT NULL,
    experience TEXT,
    "description" TEXT,
    usr_id INT NOT NULL REFERENCES usr(id)
);

CREATE TABLE lang (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE it_lang (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE usr_speaks_lang (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usr_id INT NOT NULL REFERENCES usr(id),
    lang_id INT NOT NULL REFERENCES lang(id),
    UNIQUE (usr_id, lang_id)
);

CREATE TABLE usr_knows_it_lang (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "level" INT NOT NULL CHECK("level" >= 0 AND "level" <= 10),
    "search" BOOLEAN NOT NULL default false,
    usr_id INT NOT NULL REFERENCES usr(id),
    it_lang_id INT NOT NULL REFERENCES it_lang(id),
    UNIQUE (usr_id, it_lang_id)
);

CREATE TABLE disponibility (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    day TEXT NOT NULL,
    start_session TIME NOT NULL,
    duration_session interval not null,
    usr_id INT NOT NULL REFERENCES usr(id)
);

CREATE TABLE chat (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);

CREATE TABLE usr_message_chat (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    script TEXT,
    "date" TIMESTAMPTZ NOT NULL,
    usr_id INT NOT NULL REFERENCES usr(id),
    chat_id INT NOT NULL REFERENCES chat(id)
);

COMMIT;

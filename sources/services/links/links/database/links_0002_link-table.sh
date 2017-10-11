#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" links <<-EOSQL    
	CREATE TABLE public.link
	(
		link_id bigint NOT NULL,
		link_shared_id character varying(36) COLLATE pg_catalog."default",
		link_url character varying(2000) COLLATE pg_catalog."default",
		CONSTRAINT link_pkey PRIMARY KEY (link_id)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;

	ALTER TABLE public.link
		OWNER to links;
		
	CREATE SEQUENCE public.link_id_seq
		INCREMENT 1
		START 1
		MINVALUE 1
		MAXVALUE 9223372036854775807
		CACHE 1;

	ALTER SEQUENCE public.link_id_seq
		OWNER TO links;
EOSQL

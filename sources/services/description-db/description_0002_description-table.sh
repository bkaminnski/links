#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" description <<-EOSQL    
	CREATE TABLE public.description
	(
		desc_id bigint NOT NULL,
		desc_link_shared_id character varying(36) COLLATE pg_catalog."default",
		desc_description character varying(2000) COLLATE pg_catalog."default",
		CONSTRAINT desc_pkey PRIMARY KEY (desc_id)
	)
	WITH (
		OIDS = FALSE
	)
	TABLESPACE pg_default;

	ALTER TABLE public.description
		OWNER to description;
		
	CREATE SEQUENCE public.desc_id_seq
		INCREMENT 1
		START 1
		MINVALUE 1
		MAXVALUE 9223372036854775807
		CACHE 1;

	ALTER SEQUENCE public.desc_id_seq
		OWNER TO description;
EOSQL

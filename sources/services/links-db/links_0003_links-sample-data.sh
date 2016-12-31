#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" links <<-EOSQL    
	INSERT INTO public.link(link_id, link_shared_id, link_keywords, link_url) VALUES (nextval('link_id_seq'), '5a607f66-4cad-4db2-a787-b22e676a651f', 'Adam Bien, react, JEE', 'https://www.youtube.com/watch?v=A800BaLBB2k');
	INSERT INTO public.link(link_id, link_shared_id, link_keywords, link_url) VALUES (nextval('link_id_seq'), '39a059a1-26d0-489d-b037-05c6d9d4a1a8', 'Christopher Batey, docker, JVM, Devoxx Poland 2016', 'https://www.youtube.com/watch?v=Vt4G-pHXfs4');
	INSERT INTO public.link(link_id, link_shared_id, link_keywords, link_url) VALUES (nextval('link_id_seq'), '6f7ec7d3-6e9c-4814-8fe1-860fabcaa27d', 'Chris Hawkes, react, babel, webpack', 'https://www.youtube.com/watch?v=w5TupxbnnrM');
EOSQL

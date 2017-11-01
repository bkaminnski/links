#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" urls <<-EOSQL    
	INSERT INTO public.url(url_id, url_link_shared_id, url_url) VALUES (nextval('url_id_seq'), '5a607f66-4cad-4db2-a787-b22e676a651f', 'https://www.youtube.com/watch?v=A800BaLBB2k');
	INSERT INTO public.url(url_id, url_link_shared_id, url_url) VALUES (nextval('url_id_seq'), '39a059a1-26d0-489d-b037-05c6d9d4a1a8', 'https://www.youtube.com/watch?v=Vt4G-pHXfs4');
	INSERT INTO public.url(url_id, url_link_shared_id, url_url) VALUES (nextval('url_id_seq'), '6f7ec7d3-6e9c-4814-8fe1-860fabcaa27d', 'https://www.youtube.com/watch?v=w5TupxbnnrM');
EOSQL

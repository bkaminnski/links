#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" links <<-EOSQL    
	INSERT INTO public.link(id, description, keywords, url) VALUES (nextval('link_id_seq'), 'Java EE becomes an interesting platform for exposing services for mobile apps. To give you a feeling about the productivity, I installed a CORS filter, implemented, built and deployed a Java EE 7 service from scratch, exposed a JSON-array, implemented a HTTP client using stock XMLHttpRequest and rendered the result using the React JavaScript library.', 'Adam Bien, react, JEE', 'https://www.youtube.com/watch?v=A800BaLBB2k');
	INSERT INTO public.link(id, description, keywords, url) VALUES (nextval('link_id_seq'), 'Containers are the latest hype. It goes without saying that Docker for the development environment is a good thing but what about running our production Java applications inside a container?', 'Christopher Batey, docker, JVM, Devoxx Poland 2016', 'https://www.youtube.com/watch?v=Vt4G-pHXfs4');
	INSERT INTO public.link(id, description, keywords, url) VALUES (nextval('link_id_seq'), 'Things change in the JavaScript world so fast nowadays. I feel this video is relatively future proof going into 2017 as to how babel, react and webpack should be used together to make development easier.', 'Chris Hawkes, react, babel, webpack', 'https://www.youtube.com/watch?v=w5TupxbnnrM');
EOSQL

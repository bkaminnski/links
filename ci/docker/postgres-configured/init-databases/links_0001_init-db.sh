#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER links WITH PASSWORD 'links';
    CREATE DATABASE links;
    GRANT ALL PRIVILEGES ON DATABASE links TO links;
EOSQL
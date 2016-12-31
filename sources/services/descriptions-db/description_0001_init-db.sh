#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER description WITH PASSWORD 'descriptionsecretpassword';
    CREATE DATABASE description;
    GRANT ALL PRIVILEGES ON DATABASE description TO description;
EOSQL
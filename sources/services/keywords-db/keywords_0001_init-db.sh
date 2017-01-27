#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER keywords WITH PASSWORD 'keywordssecretpassword';
    CREATE DATABASE keywords;
    GRANT ALL PRIVILEGES ON DATABASE keywords TO keywords;
EOSQL
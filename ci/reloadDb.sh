#!/bin/bash
docker kill postgres-dev
docker rm postgres-dev
docker rmi links/postgres-dev
./up.js

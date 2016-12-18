#!/bin/bash
docker kill wildfly-dev
docker rm wildfly-dev
docker kill postgres-dev
docker rm postgres-dev
docker rmi links/postgres-dev
./up.js

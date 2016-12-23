#!/bin/bash
docker kill wildfly-dev
docker rm wildfly-dev
docker rmi links/wildfly-dev
./up.js

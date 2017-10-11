#!/usr/bin/jjs -fv

load("./scripts/docker.js");
load("./scripts/databaseScripts.js");
load('./scripts/command.js');

var databaseScripts = new DatabaseScripts(["sh"]);

function databaseUp() {
	buildPostgresConfigured();
	runPostgresConfigured();
}

function preBuild() {
	databaseScripts.deleteIn("./docker/postgres-configured/docker-entrypoint-initdb.d/");
	databaseScripts.copyFromServicesToTargetDirectory("../sources/services/", "./docker/postgres-configured/docker-entrypoint-initdb.d/");	
}

function postBuild() {
	databaseScripts.deleteIn("./docker/postgres-configured/docker-entrypoint-initdb.d/");
}

function buildPostgresConfigured() {
	var dockerImages = new DockerImages();
	dockerImages.build('./docker/postgres-configured', 'postgres-configured', '', preBuild, postBuild);
}

function runPostgresConfigured() {
	var dockerContainers = new DockerContainers();
	dockerContainers.run('postgres-configured', 'postgres-configured', '-p 5432:5432 -e POSTGRES_PASSWORD=postgres --network links');
	dockerContainers.waitFor('postgres-configured', 'database system is ready to accept connections');
}
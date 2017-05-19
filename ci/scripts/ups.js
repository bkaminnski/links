#!/usr/bin/jjs -fv

load("./scripts/docker.js");
load("./scripts/scriptsCopier.js");
load('./scripts/command.js');

function dbUp() {
	var scriptsCopier = new ScriptsCopier("../sources/services/", "-db", ["sh"], "./docker/postgres-configured/docker-entrypoint-initdb.d/");
	var postgresPreRun = function () {
		scriptsCopier.deleteScriptsInTargetDirectory();
		scriptsCopier.copyScriptsFromSourcesToTargetDirectory();
	};

	var dockerImages = new DockerImages();
	dockerImages.build('./docker/postgres-configured', 'postgres-configured', postgresPreRun);

	var dockerContainers = new DockerContainers();
	dockerContainers.run('postgres-configured', 'postgres-configured', '-p 5432:5432 -e POSTGRES_PASSWORD=postgressecretpassword');
	dockerContainers.waitFor('postgres-configured', 'database system is ready to accept connections');

	scriptsCopier.deleteScriptsInTargetDirectory();
}

function mwUp() {
	var dockerImages = new DockerImages();
	dockerImages.build('./docker/java', 'java');
	dockerImages.build('./docker/wildfly', 'wildfly');
	dockerImages.build('./docker/wildfly-configured', 'wildfly-configured');

	var dockerContainers = new DockerContainers();
	dockerContainers.run('wildfly-configured', 'wildfly-configured', '-p 8080:8080 -p 9990:9990 -p 8787:8787 --link=postgres-configured');
	dockerContainers.waitFor('wildfly-configured', 'WildFly Full 10.1.0.Final (WildFly Core 2.2.0.Final) started');
}

function compileLibs() {
	new Command('../sources/libs/', 'mvn clean install').execute();
	new Command('../sources/libs/accessibility', 'mvn clean install').execute();
	new Command('../sources/libs/monitoring', 'mvn clean install').execute();
	new Command('../sources/libs/events', 'mvn clean install').execute();
}

function compileUisOnce() {
	compileUis(180000, 'build-once');
}

function compileUisWatch() {
	compileUis(0, 'build-watch');
}

function compileUis(timeout, buildCommand) {
	new Command('../sources/services/application-ui/', 'npm install').execute()
	new Command('../sources/services/application-ui/', 'npm run ' + buildCommand).execute()

	new Command('../sources/services/unique-ids-ui/', 'npm install').execute()
	new Command('../sources/services/unique-ids-ui/', 'npm run ' + buildCommand).execute()

	new Command('../sources/services/push-ui/', 'npm install').execute()
	new Command('../sources/services/push-ui/', 'npm run ' + buildCommand).execute()

	new Command('../sources/services/monitoring-ui/', 'npm install').execute()
	new Command('../sources/services/monitoring-ui/', 'npm run ' + buildCommand).execute()

	new Command('../sources/services/menu-and-content-ui/', 'npm install').execute()
	new Command('../sources/services/menu-and-content-ui/', 'npm run ' + buildCommand).execute()

	new Command('../sources/services/links-ui/', 'npm install').execute()
	new Command('../sources/services/links-ui/', 'npm run ' + buildCommand).execute()

	new Command('../sources/services/about-ui/', 'npm install').execute()
	new Command('../sources/services/about-ui/', 'npm run ' + buildCommand).execute()

	new Command('../sources/services/descriptions-ui/', 'npm install').execute()
	new Command('../sources/services/descriptions-ui/', 'npm run ' + buildCommand).execute()

	new Command('../sources/services/keywords-ui/', 'npm install').execute()
	new Command('../sources/services/keywords-ui/', 'npm run ' + buildCommand).execute()
}

function compileAndDeployMw() {
	new Command('../sources/services', 'mvn install').execute();
	new Command('../sources/services/application-be/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/unique-ids-be/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/push-be/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/monitoring-be/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/menu-and-content-be/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/links-be/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/about-be/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/descriptions-be/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/keywords-be/', 'mvn clean install -P wildfly-local').execute();
}

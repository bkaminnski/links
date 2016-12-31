#!/usr/bin/jjs -fv

load("./scripts/docker.js");
load("./scripts/scriptsCopier.js");
load('./scripts/command.js');
load('./scripts/parallelExecutor.js');

function dbUp() {
	var scriptsCopier = new ScriptsCopier("../sources/services/", "-db", ["sh"], "./postgres-dev/docker-entrypoint-initdb.d/");
	var postgresPreRun = function() {
		scriptsCopier.deleteScriptsInTargetDirectory();
		scriptsCopier.copyScriptsFromSourcesToTargetDirectory();
	};

	var dockerImages = new DockerImages();
	dockerImages.build('postgres-dev', 'links/postgres-dev', postgresPreRun);
	
	var dockerContainers = new DockerContainers();
	dockerContainers.run('postgres-dev', 'links/postgres-dev', '-p 5432:5432 -e POSTGRES_PASSWORD=postgressecretpassword');
	dockerContainers.waitFor('postgres-dev', 'database system is ready to accept connections');
	
	scriptsCopier.deleteScriptsInTargetDirectory();
}

function mwUp() {
	var scriptsCopier = new ScriptsCopier("../sources/services/", "-mw", ["cli"], "./wildfly-dev/docker-entrypoint-initmw.d/");
	var wildflyPreRun = function() {
		scriptsCopier.deleteScriptsInTargetDirectory();
		scriptsCopier.copyScriptsFromSourcesToTargetDirectory();
	};

	var dockerImages = new DockerImages();
	dockerImages.build('java', 'links/java');
	dockerImages.build('wildfly', 'links/wildfly');
	dockerImages.build('wildfly-dev', 'links/wildfly-dev', wildflyPreRun);

	var dockerContainers = new DockerContainers();
	dockerContainers.run('wildfly-dev', 'links/wildfly-dev', '-p 8080:8080 -p 9990:9990 --link=postgres-dev');
	dockerContainers.waitFor('wildfly-dev', 'WildFly Full 10.1.0.Final (WildFly Core 2.2.0.Final) started');
	
	scriptsCopier.deleteScriptsInTargetDirectory();
}

function compileLibs() {
	new Command('../sources/libs/', 'mvn clean install').execute();
	new Command('../sources/libs/accessibility', 'mvn clean install').execute();
	new Command('../sources/libs/monitoring', 'mvn clean install').execute();
	new Command('../sources/libs/events', 'mvn clean install').execute();
}

function compileUisOnce() {
	compileUis(60000, 'build-once');
}

function compileUisWatch() {
	compileUis(0, 'build-watch');
}

function compileUis(timeout, buildCommand) {
	new ParallelExecutor().withTimeoutInMillis(timeout).execute(
		[
			[
				new Command('../sources/services/links-ui/', 'npm install'),
				new Command('../sources/services/links-ui/', 'npm run ' + buildCommand)
			]
		]
	);
}

function compileAndDeployMw() {
	new Command('../sources/services', 'mvn install').execute();
	new ParallelExecutor().withTimeoutInMillis(60000).execute(
		[
			[
				new Command('../sources/services/links-be/', 'mvn clean install -P wildfly-local')
			],
			[
				new Command('../sources/services/descriptions-be/', 'mvn clean install -P wildfly-local')
			]
		]
	);
}

#!/usr/bin/jjs -fv

load('./scripts/command.js');

function compileLibs() {
	new Command('../sources/libs/', 'mvn clean install').execute();
	new Command('../sources/libs/authentication', 'mvn clean install').execute();
	new Command('../sources/libs/identification', 'mvn clean install').execute();
	new Command('../sources/libs/monitoring', 'mvn clean install').execute();
	new Command('../sources/libs/events', 'mvn clean install').execute();
	new Command('../sources/libs/discovery', 'mvn clean install').execute();
}

function compileAndDeployCore() {
	new Command('../sources/services/core/parent', 'mvn install').execute();
	new Command('../sources/services/core/about/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/core/application/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/core/menu-and-content/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/core/monitoring/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/core/push/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/core/unique-ids/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/core/users/backend/', 'mvn clean install -P wildfly-local').execute();
}

function compileAndDeployLinks() {
	new Command('../sources/services/links/links/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/links/descriptions/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/links/keywords/backend/', 'mvn clean install -P wildfly-local').execute();
}

function compileUICore() {
	new Command('../sources/services/core/about/frontend', 'npm run build-once').execute();
	new Command('../sources/services/core/application/frontend', 'npm run build-once').execute();
	new Command('../sources/services/core/menu-and-content/frontend', 'npm run build-once').execute();
	new Command('../sources/services/core/monitoring/frontend', 'npm run build-once').execute();
	new Command('../sources/services/core/push/frontend', 'npm run build-once').execute();
	new Command('../sources/services/core/unique-ids/frontend', 'npm run build-once').execute();
	new Command('../sources/services/core/users/frontend', 'npm run build-once').execute();
}

function compileUILinks() {
	new Command('../sources/services/links/links/frontend', 'npm run build-once').execute();
	new Command('../sources/services/links/descriptions/frontend', 'npm run build-once').execute();
	new Command('../sources/services/links/keywords/frontend', 'npm run build-once').execute();
}



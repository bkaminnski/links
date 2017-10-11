#!/usr/bin/jjs -fv

load('./scripts/command.js');

function compileLibs() {
	new Command('../sources/libs/', 'mvn clean install').execute();
	new Command('../sources/libs/accessibility', 'mvn clean install').execute();
	new Command('../sources/libs/monitoring', 'mvn clean install').execute();
	new Command('../sources/libs/events', 'mvn clean install').execute();
	new Command('../sources/libs/availability', 'mvn clean install').execute();
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
	new Command('../sources/services/links/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/descriptions/backend/', 'mvn clean install -P wildfly-local').execute();
	new Command('../sources/services/keywords/backend/', 'mvn clean install -P wildfly-local').execute();
}
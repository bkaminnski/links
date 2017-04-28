#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/ups.js');

new ParallelExecutor().withTimeoutInMillis(60000).execute(
	[
		[
			new Command('.', 'docker kill wildfly-configured'),
			new Command('.', 'docker rm wildfly-configured')
		],
		[
			new Command('.', 'docker kill postgres-configured'),
			new Command('.', 'docker rm postgres-configured'),
			new Command('.', 'docker rmi postgres-configured')
		]
	]
);

dbUp();
mwUp();
compileAndDeployMw();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
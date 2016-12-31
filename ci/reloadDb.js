#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/ups.js');

new ParallelExecutor().withTimeoutInMillis(60000).execute(
	[
		[
			new Command('.', 'docker kill wildfly-dev'),
			new Command('.', 'docker rm wildfly-dev')
		],
		[
			new Command('.', 'docker kill postgres-dev'),
			new Command('.', 'docker rm postgres-dev'),
			new Command('.', 'docker rmi links/postgres-dev')
		]
	]
);

dbUp();
mwUp();
compileAndDeployMw();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
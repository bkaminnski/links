#!/usr/bin/jjs -fv

load('./scripts/command.js');
load('./scripts/parallelExecutor.js');

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

load('./up.js');
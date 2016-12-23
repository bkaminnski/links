#!/usr/bin/jjs -fv

load('./scripts/command.js');
load('./scripts/parallelExecutor.js');

new ParallelExecutor().withTimeoutInMillis(60000).execute(
    [
        [
            new Command('../sources/links/', 'mvn clean install -P wildfly-local')
        ]
    ]
);


#!/usr/bin/jjs -fv

load('./scripts/command.js');
load('./scripts/parallelExecutor.js');

new ParallelExecutor().withTimeoutInMillis(0).execute(
    [
        [
            new Command('../sources/services/links-ui/', 'npm install'),
            new Command('../sources/services/links-ui/', 'npm run build-watch')
        ]
    ]
);


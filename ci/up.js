#!/usr/bin/jjs -fv

load("./scripts/docker.js");
load("./scripts/dbScripts.js");
load('./scripts/command.js');
load('./scripts/parallelExecutor.js');

var dbScripts = new DbScripts("../sources/", "./postgres-dev/docker-entrypoint-initdb.d/", ["sh", "sql"]);
dbScripts.deleteScriptsInInitializationDirectory();
dbScripts.copyScriptsFromSourcesToInitializationDirectory();

var dockerImages = new DockerImages();
dockerImages.build('java', 'links/java');
dockerImages.build('wildfly', 'links/wildfly');
dockerImages.build('wildfly-dev', 'links/wildfly-dev');
dockerImages.build('postgres-dev', 'links/postgres-dev');

var dockerContainers = new DockerContainers();
dockerContainers.run('postgres-dev', 'links/postgres-dev', '-p 5432:5432 -e POSTGRES_PASSWORD=postgressecretpassword');
dockerContainers.waitFor('postgres-dev', 'database system is ready to accept connections');
dockerContainers.run('wildfly-dev', 'links/wildfly-dev', '-p 8080:8080 -p 9990:9990 --link=postgres-dev');
dockerContainers.waitFor('wildfly-dev', 'WildFly Full 10.1.0.Final (WildFly Core 2.2.0.Final) started');

new ParallelExecutor().withTimeoutInMillis(60000).execute(
    [
        [
            new Command('../sources/links-ui/', 'npm install'),
            new Command('../sources/links-ui/', 'npm run build-once'),
            new Command('../sources/links/', 'mvn clean install -P wildfly-local')
        ]
    ]
);


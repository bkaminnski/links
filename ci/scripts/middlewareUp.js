#!/usr/bin/jjs -fv

load("./scripts/docker.js");
load('./scripts/command.js');

function middlewareUp() {
	var dockerImages = new DockerImages();
	dockerImages.build('./docker/java', 'java');
	dockerImages.build('./docker/wildfly', 'wildfly');
	dockerImages.build('./docker/wildfly-configured', 'wildfly-configured', '--build-arg WILDFLY_PASSWORD=admin');

	var dockerContainers = new DockerContainers();
	dockerContainers.run('wildfly-configured', 'wildfly-configured', '-p 8080:8080 -p 9990:9990 -p 8787:8787 --network links');
	dockerContainers.waitFor('wildfly-configured', 'WildFly Full 10.1.0.Final (WildFly Core 2.2.0.Final) started');
}
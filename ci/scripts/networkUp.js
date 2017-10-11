#!/usr/bin/jjs -fv

load("./scripts/docker.js");
load('./scripts/command.js');

function networkUp() {
    var dockerNetworks = new DockerNetworks();
	dockerNetworks.assureExisists('links');
}
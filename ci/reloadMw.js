#!/usr/bin/jjs -fv

load('./scripts/command.js');
load('./scripts/parallelExecutor.js');

new Command('.', 'docker kill wildfly-dev').execute();
new Command('.', 'docker rm wildfly-dev').execute();

load('./up.js');
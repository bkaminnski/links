#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/ups.js');

new Command('.', 'docker kill wildfly-configured').execute();
new Command('.', 'docker rm wildfly-configured').execute();
new Command('.', 'docker rmi wildfly-configured').execute();

mwUp();
compileAndDeployMw();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
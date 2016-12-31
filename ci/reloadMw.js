#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/ups.js');

new Command('.', 'docker kill wildfly-dev').execute();
new Command('.', 'docker rm wildfly-dev').execute();
new Command('.', 'docker rmi links/wildfly-dev').execute();

mwUp();
compileAndDeployMw();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
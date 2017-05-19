#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/ups.js');

new Command('.', 'docker kill wildfly-configured').execute();
new Command('.', 'docker rm wildfly-configured').execute();
new Command('.', 'docker kill postgres-configured').execute();
new Command('.', 'docker rm postgres-configured').execute();
new Command('.', 'docker rmi postgres-configured').execute();

dbUp();
mwUp();
compileAndDeployMw();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/databaseUp.js');
load('./scripts/middlewareUp.js');

new Command('.', 'docker rm -f postgres-configured').execute();
new Command('.', 'docker rmi postgres-configured').execute();
new Command('.', 'docker kill wildfly-configured').execute();

databaseUp();
middlewareUp();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
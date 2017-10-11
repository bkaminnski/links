#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/middlewareUp.js');

new Command('.', 'docker rm -f wildfly-configured').execute();
new Command('.', 'docker rmi wildfly-configured').execute();

middlewareUp();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
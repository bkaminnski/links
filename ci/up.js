#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/networkUp.js');
load('./scripts/databaseUp.js');
load('./scripts/middlewareUp.js');

networkUp();
databaseUp();
middlewareUp();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
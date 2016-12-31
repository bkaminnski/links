#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/ups.js');

compileUisOnce();
compileAndDeployMw();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
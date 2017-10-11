#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/compilations.js');

compileUICore();
compileUILinks();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
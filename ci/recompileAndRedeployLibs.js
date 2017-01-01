#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/ups.js');

compileLibs();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
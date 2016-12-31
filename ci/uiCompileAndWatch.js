#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/ups.js');

compileUisWatch();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
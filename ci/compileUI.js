#!/usr/bin/jjs -fv

var timeStarted = new Date().getTime();

load('./scripts/compilations.js');

compileLibs();
compileAndDeployCore();
compileAndDeployLinks();

print('Script finished after ' + (new Date().getTime() - timeStarted) + ' millis');
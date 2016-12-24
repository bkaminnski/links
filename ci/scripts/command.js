var Runtime = Java.type('java.lang.Runtime');
var File = Java.type("java.io.File");
var Scanner = Java.type("java.util.Scanner");
var Date =  Java.type("java.util.Date");
var InputStreamReader =  Java.type("java.io.InputStreamReader");
var BufferedReader =  Java.type("java.io.BufferedReader");

function Command(workDir, cmd) {
    this.id = '';
    this.workDir = workDir;
    this.cmd = cmd;

    this.withId = function(id) {
        this.id = id;
        return this;
    }

    this.execute = function() {
        print(this.logPrefix() + 'Execute');
        var timeStarted = new Date().getTime();
        var result = -1;
        try {
            var process = this.executeSystemSpecific();
			this.consoleLog(process.getInputStream(), 'input');
            this.consoleLog(process.getErrorStream(), 'error');
			result = process.waitFor();
        } catch (exception) {
            exception.printStackTrace();
        }
        print(this.logPrefix() + 'Command finished with ' + (result === 0 ? 'success' : 'failure') + ' after ' + (new Date().getTime() - timeStarted) + ' millis');
        return result;
    }

    this.executeSystemSpecific = function() {
        return Runtime.getRuntime().exec(this.systemSpecificCommand(), ['JAVA_HOME=' + $ENV.JAVA_HOME, 'PATH=' + this.systemSpecificPath(), 'M2_HOME=' + $ENV.M2_HOME], new File(this.workDir))
    }

    this.systemSpecificCommand = function() {
        var commandInterpreter = '';
        if (java.lang.System.getProperty("os.name").indexOf('Windows') >= 0) {
            commandInterpreter = 'cmd.exe /C ';
        }
print('interpreter: ' + commandInterpreter + this.cmd);
        return commandInterpreter + this.cmd;
    }

    this.systemSpecificPath = function() {
        var variableNameInWindows = 'Path';
        var variableNameInLinux = 'PATH';
        return ($ENV[variableNameInWindows] == null ? $ENV[variableNameInLinux] : $ENV[variableNameInWindows]);
    }

    this.consoleLog = function(stream, type) {
        var thisObj = this;
		new Thread(function() {
            try {
                var inputStreamReader = new InputStreamReader(stream);
                var bufferedReader = new BufferedReader(inputStreamReader);
                var line = null;
                while ((line = bufferedReader.readLine()) != null) {
                    print(thisObj.logPrefix() + line);
                }
            } catch (exception){
                exception.printStackTrace();
            }
        }).start();
    }

    this.logPrefix = function() {
        return this.id + ':' + this.workDir + ':' + this.cmd + ':';
    }
}

var Runtime = Java.type('java.lang.Runtime');
var File = Java.type("java.io.File");
var Scanner = Java.type("java.util.Scanner");
var Date =  Java.type("java.util.Date");

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
            var process = Runtime.getRuntime().exec(this.cmd, ['JAVA_HOME=' + $ENV.JAVA_HOME, 'PATH=' + $ENV.PATH], new File(this.workDir));
//            this.consoleLog(process.getInputStream());
  //          this.consoleLog(process.getErrorStream());
            result = process.waitFor();
        } catch (exception) {
            print(exception);
        }
        print(this.logPrefix() + 'Command finished with ' + (result === 0 ? 'success' : 'failure') + ' after ' + (new Date().getTime() - timeStarted) + ' millis');
        return result;
    }

    this.consoleLog = function(stream) {
        scanner = new Scanner(stream);
        while (scanner.hasNextLine()) {
            print(this.logPrefix() + scanner.nextLine());
        }
        scanner.close();
    }

    this.logPrefix = function() {
        return this.id + ':' + this.workDir + ':' + this.cmd + ':';
    }
}

var Thread = Java.type('java.lang.Thread');
var CountDownLatch = Java.type('java.util.concurrent.CountDownLatch');
var Runtime = Java.type('java.lang.Runtime');
var File = Java.type('java.io.File');
var Scanner = Java.type('java.util.Scanner');
var TimeUnit = Java.type('java.util.concurrent.TimeUnit');

function ParallelExecutor() {
    this.timeoutInMillis = 60000;
    this.signal = null;

    this.withTimeoutInMillis = function(timeoutInMillis) {
        this.timeoutInMillis = timeoutInMillis;
        return this;
    }

    this.execute = function(sequences) {
        this.signal = new CountDownLatch(sequences.length);
        var timeStarted = new Date().getTime();
        for (i in sequences) {
            this.executeSequence(i, sequences[i]); 
        }
        var counterReachedZero = this.signal.await(this.timeoutInMillis, TimeUnit.MILLISECONDS);
        if (counterReachedZero) {
            print('All ' + sequences.length + ' sequence(s) finished after ' + (new Date().getTime() - timeStarted) + ' millis');
        } else {
            print('Timeout ' + this.timeoutInMillis + ' millis was reached, some sequences might still be running');
        }
    }

    this.executeSequence = function(id, sequence) {
        var signalObj = this.signal;
        new Thread(function() {
            var numberOfFailures = 0;
            var timeStarted = new Date().getTime();
            for (i in sequence) {
                var command = sequence[i];
                var result = command.withId(id).execute();
                if (result != 0) {
                    numberOfFailures++;
                }
            }
            print(id + ':Sequence of ' + sequence.length + ' command(s) finished with ' + numberOfFailures + ' failure(s) after ' + (new Date().getTime() - timeStarted) + ' millis');
            signalObj.countDown();
        }).start();
   }
}

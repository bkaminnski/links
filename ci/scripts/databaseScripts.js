var File = Java.type("java.io.File");
var Files = Java.type("java.nio.file.Files");
var Stream = Java.type("java.util.stream.Stream");
var Arrays = Java.type("java.util.Arrays");
var Collectors = Java.type("java.util.stream.Collectors");

function DatabaseScripts(extensions) {
    this.extensions = extensions;

    this.deleteIn = function (directory) {
        this.databaseScripts(Stream.of(new File(directory)))
            .forEach(function (f) { print("Deleting " + f); f.delete(); });
    }

    this.copyFromServicesToTargetDirectory = function (servicesDirectory, targetDirectory) {
        var targetDirectry = new File(targetDirectory).toPath();
        this.databaseScripts(this.databaseDirectories(this.services(this.businessAreas(servicesDirectory))))
            .forEach(function (f) { print("Copying " + f); Files.copy(f.toPath(), targetDirectry.resolve(f.getName())); });
    }

    this.databaseScripts = function (directories) {
        var thisObj = this;
        return directories
            .map(function (f) { return f.listFiles(); })
            .flatMap(function (a) { return Arrays.stream(a); })
            .filter(function (f) { return thisObj.extensionMatches(f); });
    }

    this.databaseDirectories = function (directories) {
        return directories
            .map(function (f) { return f.listFiles(); })
            .flatMap(function (a) { return Arrays.stream(a); })
            .filter(function (f) { return f.getName() == 'database' && f.isDirectory(); });
    }

    this.services = function (directories) {
        return directories
            .map(function (f) { return f.listFiles(); })
            .flatMap(function (a) { return Arrays.stream(a); })
            .filter(function (f) { return f.isDirectory(); });
    }

    this.businessAreas = function (servicesDirectory) {
        return Arrays.stream(new File(servicesDirectory).listFiles())
            .filter(function (f) { return f.getName() != 'node_modules' && f.isDirectory(); })
    }

    this.extensionMatches = function (file) {
        var fileName = file.getName();
        var extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        return this.extensions.indexOf(extension) >= 0;
    }
}

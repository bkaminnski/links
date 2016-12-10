var File = Java.type("java.io.File");
var Files = Java.type("java.nio.file.Files");
var Stream = Java.type("java.util.stream.Stream");
var Arrays = Java.type("java.util.Arrays");
var Collectors = Java.type("java.util.stream.Collectors");

function DbScripts(sourceDirectoryWithDbProjects, targetDirectoryToInitializeDb, dbScriptsExtensions) {
    this.sourceDirectoryWithDbProjects = sourceDirectoryWithDbProjects;    
    this.targetDirectoryToInitializeDb = targetDirectoryToInitializeDb;
    this.dbScriptsExtensions = dbScriptsExtensions;

    this.deleteScriptsInInitializationDirectory = function() {
        this.dbScripts(this.initializationDirectory())
            .forEach(function(f) { print("Deleting " + f); f.delete(); });
    }
    
    this.copyScriptsFromSourcesToInitializationDirectory = function() {
        var initializationDirectory = new File(this.targetDirectoryToInitializeDb).toPath();
        this.dbScripts(this.dbProjects())
            .forEach(function(f) { print("Copying " + f); Files.copy(f.toPath(), initializationDirectory.resolve(f.getName())); });
    }

    this.dbScripts = function(directories) {
        var thisObj = this;
        return directories
            .map(function(f) { return f.listFiles(); })
            .flatMap(function(a) { return Arrays.stream(a); })
            .filter(function(f) { return thisObj.fileIsDbScript(f); });
    }

    this.dbProjects = function() {
        return Arrays.stream(new File(this.sourceDirectoryWithDbProjects).listFiles())
            .filter(function(f) { return f.getName().endsWith("-db"); });
    }

    this.initializationDirectory = function() {
        return Stream.of(new File(this.targetDirectoryToInitializeDb));
    }

    this.fileIsDbScript = function(file) {
        var fileName = file.getName();
        var extension = fileName.substring(fileName.lastIndexOf('.') + 1);  
        return this.dbScriptsExtensions.indexOf(extension) >= 0;
    }
}
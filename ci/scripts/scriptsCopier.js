var File = Java.type("java.io.File");
var Files = Java.type("java.nio.file.Files");
var Stream = Java.type("java.util.stream.Stream");
var Arrays = Java.type("java.util.Arrays");
var Collectors = Java.type("java.util.stream.Collectors");

function ScriptsCopier(sourceDirectoryWithProjects, projectDirectoriesSuffix, extensionsOfFilesToCopy, targetDirectory) {
    this.sourceDirectoryWithProjects = sourceDirectoryWithProjects;    
	this.projectDirectoriesSuffix = projectDirectoriesSuffix;
    this.extensionsOfFilesToCopy = extensionsOfFilesToCopy;
    this.targetDirectory = targetDirectory;

    this.deleteScriptsInTargetDirectory = function() {
        this.scripts(Stream.of(new File(this.targetDirectory)))
            .forEach(function(f) { print("Deleting " + f); f.delete(); });
    }
    
    this.copyScriptsFromSourcesToTargetDirectory = function() {
        var targetDirectry = new File(this.targetDirectory).toPath();
        this.scripts(this.projects())
            .forEach(function(f) { print("Copying " + f); Files.copy(f.toPath(), targetDirectry.resolve(f.getName())); });
    }

    this.scripts = function(directories) {
        var thisObj = this;
        return directories
            .map(function(f) { return f.listFiles(); })
            .flatMap(function(a) { return Arrays.stream(a); })
            .filter(function(f) { return thisObj.fileIsACopyableScript(f); });
    }

    this.projects = function() {
        var thisObj = this;
        return Arrays.stream(new File(this.sourceDirectoryWithProjects).listFiles())
            .filter(function(f) { return f.getName().endsWith(thisObj.projectDirectoriesSuffix); });
    }

    this.fileIsACopyableScript = function(file) {
        var fileName = file.getName();
        var extension = fileName.substring(fileName.lastIndexOf('.') + 1);  
        return this.extensionsOfFilesToCopy.indexOf(extension) >= 0;
    }
}

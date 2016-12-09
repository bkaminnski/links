#!/usr/bin/jjs -fv

var dockerImages = new DockerImages();
dockerImages.build('java', 'links/java');
dockerImages.build('wildfly', 'links/wildfly');
dockerImages.build('wildfly-dev', 'links/wildfly-dev');
dockerImages.build('postgres-dev', 'links/postgres-dev');

var dockerContainers = new DockerContainers();
dockerContainers.run('postgres-dev', 'links/postgres-dev', '-p 5432:5432 -e POSTGRES_PASSWORD=postgressecretpassword');
dockerContainers.run('wildfly-dev', 'links/wildfly-dev', '-p 8080:8080 -p 9990:9990 --link=postgres-dev');

function DockerImages() {
        this.existingImages = loadExistingImages();

        function loadExistingImages () {
                $EXEC('docker images');
                return $OUT;
        }

        this.build = function(folder, image) {
                if (this.exists(image)) {
                        print(image + ' image already exists');
			return;
                }
                print('building ' + image + ' image...');
                $ENV.PWD = './' + folder;
                $EXEC('docker build -t ' + image + ' .');
                print($OUT)
        }

	this.exists = function(image) {
		return this.existingImages.indexOf(image) >= 0;
	}
}

function DockerContainers() {
	this.runningContainers = loadRunningContainers();
	this.existingContainers = loadExistingContainers();
	
	function loadRunningContainers() {
		$EXEC('docker ps');;
                return $OUT;
	}

	function loadExistingContainers() {
		$EXEC('docker ps -a');
                return $OUT;
	}

	this.run = function(container, image, parameters) {
		if (this.isRunning(container)) {
			print(container + ' container is already running');
			return;
		}

		if (!this.exists(container)) {
			print('running ' + container + ' container...');
			$EXEC('docker run --name ' + container + ' -d ' + parameters + ' ' + image);
			print($OUT);
			return;
		}

		print('starting ' + container + ' container...');
		$EXEC('docker start ' + container);
		print($OUT);
	}

	this.isRunning = function(container) {
		return this.runningContainers.indexOf(container) >= 0;
	}

	this.exists = function(container) {
		return this.existingContainers.indexOf(container) >= 0;
	}
}


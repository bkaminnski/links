#!/usr/bin/jjs -fv

var dockerImages = new DockerImages();
dockerImages.buildImage('java', 'links/java');
dockerImages.buildImage('wildfly', 'links/wildfly');
dockerImages.buildImage('wildfly', 'links/wildfly-dev');
dockerImages.buildImage('postgres-dev', 'links/postgres-dev');

// $EXEC('docker run --name=wildfly-dev -d -p 8080:8080 -p 9990:9990 --link=postgres-dev links/wildfly-dev');
// print($OUT);

function DockerImages() {
        this.existingImages = loadExistingImages();

        function loadExistingImages () {
                $EXEC('docker images');
                return $OUT;
        }

        this.buildImage = function(folder, imageName) {
                if (this.existingImages.indexOf(imageName) < 0) {
                        print('building ' + imageName + ' image...');
                        $ENV.PWD = './' + folder;
                        $EXEC('docker build -t ' + imageName + ' .');
                        print($OUT)
                } else {
                        print(imageName + ' image already exists');
                }
        }
}



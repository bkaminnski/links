set MAVEN_OPTS=-XX:+TieredCompilation -XX:TieredStopAtLevel=1 -DdependencyLocationsEnabled=false 
mvn clean install -P wildfly-local
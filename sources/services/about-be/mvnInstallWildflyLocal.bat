set MAVEN_OPTS=-XX:+TieredCompilation -XX:TieredStopAtLevel=1 -DdependencyLocationsEnabled=false 
mvn install -P wildfly-local
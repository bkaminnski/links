FROM links/wildfly
MAINTAINER Bartosz Kamiński, highcohesionloosecoupling.com
RUN rm ${WILDFLY_HOME}/bin/standalone.conf \
  && ${WILDFLY_HOME}/bin/add-user.sh admin adminsecretpassword --silent
ADD standalone.conf ${WILDFLY_HOME}/bin/
ENTRYPOINT ${WILDFLY_HOME}/bin/standalone.sh -b=0.0.0.0 -bmanagement=0.0.0.0
EXPOSE 8080 8787 9990

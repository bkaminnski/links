FROM links/wildfly
MAINTAINER Bartosz Kamiński, highcohesionloosecoupling.com
RUN rm ${WILDFLY_HOME}/bin/standalone.conf \
  && rm ${WILDFLY_HOME}/standalone/configuration/standalone-full.xml \
  && ${WILDFLY_HOME}/bin/add-user.sh admin adminsecretpassword --silent
ADD standalone.conf ${WILDFLY_HOME}/bin/
ADD standalone-full.xml ${WILDFLY_HOME}/standalone/configuration/standalone-full.xml
COPY docker-entrypoint-initmw.d/ /docker-entrypoint-initmw.d/
COPY initWildfly.sh /docker-entrypoint-initmw.d/initWildfly.sh
RUN chmod +x /docker-entrypoint-initmw.d/initWildfly.sh \
  && /docker-entrypoint-initmw.d/initWildfly.sh
ENTRYPOINT ${WILDFLY_HOME}/bin/standalone.sh -c standalone-full.xml -b=0.0.0.0 -bmanagement=0.0.0.0
EXPOSE 8080 8787 9990
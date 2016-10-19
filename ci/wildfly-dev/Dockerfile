FROM links/wildfly
MAINTAINER Bartosz Kamiński, highcohesionloosecoupling.com
ENV POSTGRES_MODULE ${WILDFLY_HOME}/modules/system/layers/base/postgresql/main
RUN rm ${WILDFLY_HOME}/bin/standalone.conf \
  && ${WILDFLY_HOME}/bin/add-user.sh admin adminsecretpassword --silent \
  && mkdir ${POSTGRES_MODULE} \
  && curl -o ${POSTGRES_MODULE}/postgresql-9.4.1211.jar https://jdbc.postgresql.org/download/postgresql-9.4.1211.jar
ADD standalone.conf ${WILDFLY_HOME}/bin/
ADD module.xml ${POSTGRES_MODULE}
ENTRYPOINT ${WILDFLY_HOME}/bin/standalone.sh -b=0.0.0.0 -bmanagement=0.0.0.0
EXPOSE 8080 8787 9990

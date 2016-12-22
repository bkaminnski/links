FROM links/java
MAINTAINER Bartosz Kamiński, highcohesionloosecoupling.com
ENV VERSION 10.1.0.Final
ENV INSTALL_DIR /opt
ENV WILDFLY_HOME ${INSTALL_DIR}/wildfly-${VERSION}
ENV DEPLOYMENT_DIR ${WILDFLY_HOME}/standalone/deployments/
ENV POSTGRES_MODULE ${WILDFLY_HOME}/modules/system/layers/base/postgresql/main
RUN yum install -y unzip \
  && curl -O http://download.jboss.org/wildfly/${VERSION}/wildfly-${VERSION}.zip \
  && unzip wildfly-${VERSION}.zip -d ${INSTALL_DIR} \
  && rm wildfly-${VERSION}.zip \
  && rm ${WILDFLY_HOME}/bin/standalone.conf \
  && chmod a+x ${WILDFLY_HOME}/bin/standalone.sh \
  && mkdir -p ${POSTGRES_MODULE} \
  && curl -o ${POSTGRES_MODULE}/postgresql-9.4.1211.jar https://jdbc.postgresql.org/download/postgresql-9.4.1211.jar
ADD standalone.conf ${WILDFLY_HOME}/bin/
ADD module.xml ${POSTGRES_MODULE}
ENTRYPOINT ${WILDFLY_HOME}/bin/standalone.sh -b=0.0.0.0
EXPOSE 8080 8787
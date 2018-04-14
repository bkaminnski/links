FROM bkaminnski/wildfly-standalone:10.1.0.Final

ADD ./core/about/service/target/about.war ${DEPLOYMENT_DIR}/
ADD ./core/application/service/target/application.war ${DEPLOYMENT_DIR}/
ADD ./core/menu-and-content/service/target/menu-and-content.war ${DEPLOYMENT_DIR}/
ADD ./core/monitoring/service/target/monitoring.war ${DEPLOYMENT_DIR}/
ADD ./core/push/service/target/push.war ${DEPLOYMENT_DIR}/
ADD ./core/unique-ids/service/target/unique-ids.war ${DEPLOYMENT_DIR}/
ADD ./core/users/service/target/users.war ${DEPLOYMENT_DIR}/

ADD ./links/links/service/target/links.war ${DEPLOYMENT_DIR}/
ADD ./links/urls/service/target/urls.war ${DEPLOYMENT_DIR}/
ADD ./links/descriptions/service/target/descriptions.war ${DEPLOYMENT_DIR}/
ADD ./links/keywords/service/target/keywords.war ${DEPLOYMENT_DIR}/

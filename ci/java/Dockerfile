FROM centos:7
MAINTAINER Bartosz Kamiński, highcohesionloosecoupling.com
RUN yum update -y \
  && yum install -y wget \
  && wget --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u102-b14/jdk-8u102-linux-x64.rpm \
  && yum localinstall -y jdk-8u102-linux-x64.rpm \
  && rm jdk-8u102-linux-x64.rpm


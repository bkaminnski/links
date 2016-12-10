#!/bin/bash


# Default values of script parameters
OS_USER_NAME=""
GIT_USER_NAME=""
GIT_EMAIL=""


# Read command line parameters
while [[ $# -gt 1 ]]
do
    key="$1"
    case $key in
        --os_user_name)
            OS_USER_NAME="$2"
            shift
        ;;
        --git_user_name)
            GIT_USER_NAME="$2"
            shift
        ;;
        --git_email)
            GIT_EMAIL="$2"
            shift
        ;;
        *)
        ;;
    esac
    shift
done


# Add new OS user
if [ "$OS_USER_NAME" == "" ]; then
    echo "Call with --os_user_name <OS user name> parameter"
    exit
else
    adduser $OS_USER_NAME
    passwd $OS_USER_NAME
    usermod -aG wheel $OS_USER_NAME
fi


# Update system
yum update -y


# Install Oracle JDK
yum install -y wget
wget --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u102-b14/jdk-8u102-linux-x64.rpm
yum localinstall -y jdk-8u102-linux-x64.rpm
rm jdk-8u102-linux-x64.rpm


# Install GIT
yum install -y git
if [ "$GIT_USER_NAME" != "" ]; then
    runuser -l $OS_USER_NAME -c "git config --global user.name \"$GIT_USER_NAME\""
fi
if [ "$GIT_EMAIL" != "" ]; then
    runuser -l $OS_USER_NAME -c "git config --global user.email \"$GIT_EMAIL\""
fi


# Install Docker
tee /etc/yum.repos.d/docker.repo <<-'EOF'
[dockerrepo]
name=Docker Repository
baseurl=https://yum.dockerproject.org/repo/main/centos/7/
enabled=1
gpgcheck=1
gpgkey=https://yum.dockerproject.org/gpg
EOF
yum install -y docker-engine
systemctl enable docker.service
systemctl start docker
usermod -aG docker $OS_USER_NAME


# Install npm
yum install -y npm


# Install mvn
wget http://ftp.ps.pl/pub/apache/maven/maven-3/3.3.9/binaries/apache-maven-3.3.9-bin.tar.gz
tar xzvf apache-maven-3.3.9-bin.tar.gz --directory /home/$OS_USER_NAME/
rm apache-maven-3.3.9-bin.tar.gz
chown -R $OS_USER_NAME:$OS_USER_NAME /home/$OS_USER_NAME/apache-maven-3.3.9
echo "export JAVA_HOME=/usr/java/jdk1.8.0_102/" >> /home/$OS_USER_NAME/.bashrc
echo "PATH=\$PATH:\$HOME/apache-maven-3.3.9/bin" >> /home/$OS_USER_NAME/.bashrc
echo "export PATH" >> /home/$OS_USER_NAME/.bashrc


# Clone GIT repository
if [ ! -d "/home/$OS_USER_NAME/links" ]; then
    runuser -l $OS_USER_NAME -c "mkdir /home/$OS_USER_NAME/links"
    runuser -l $OS_USER_NAME -c "git clone https://github.com/bkaminnski/links.git /home/$OS_USER_NAME/links"
fi


# Make tabstop=4 default value in VI
tee /home/$OS_USER_NAME/.vimrc <<-'EOF'
set softtabstop=4 shiftwidth=4 expandtab
EOF


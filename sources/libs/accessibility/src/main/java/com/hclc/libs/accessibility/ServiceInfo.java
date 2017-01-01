package com.hclc.libs.accessibility;

public abstract class ServiceInfo {

    public abstract String serviceName();

    public abstract String serviceExternalHost();

    public abstract int serviceExternalPort();

    public String fullUrlTo(String resource) {
        return "http://" + serviceExternalHost() + ":" + serviceExternalPort() + resource;
    }
}

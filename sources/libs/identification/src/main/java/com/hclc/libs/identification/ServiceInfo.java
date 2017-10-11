package com.hclc.libs.identification;

public abstract class ServiceInfo {

    public abstract String serviceName();

    public int priority() {
        return Integer.MAX_VALUE;
    }
}

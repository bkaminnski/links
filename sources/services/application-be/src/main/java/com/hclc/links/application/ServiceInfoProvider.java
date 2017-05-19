package com.hclc.links.application;

import com.hclc.libs.accessibility.ServiceInfo;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

public class ServiceInfoProvider {

    private final static ServiceInfo INSTANCE = new ServiceInfo() {
        @Override
        public String serviceName() {
            return "application";
        }
    };

    public static ServiceInfo provideServiceInfo() {
        return INSTANCE;
    }

    @Produces
    ServiceInfo produceServiceInfo(InjectionPoint injectionPoint) {
        return INSTANCE;
    }
}

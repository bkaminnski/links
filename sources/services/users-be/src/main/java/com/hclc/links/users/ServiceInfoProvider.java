package com.hclc.links.users;

import com.hclc.libs.accessibility.ServiceInfo;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

public class ServiceInfoProvider {

    private final static ServiceInfo INSTANCE = new ServiceInfo() {
        @Override
        public String serviceName() {
            return "users";
        }

        @Override
        public int priority() {
            return 3000;
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

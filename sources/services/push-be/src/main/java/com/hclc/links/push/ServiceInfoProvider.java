package com.hclc.links.push;

import com.hclc.libs.accessibility.ServiceInfo;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

public class ServiceInfoProvider {

    private final static ServiceInfo INSTANCE = new ServiceInfo() {
        @Override
        public String serviceName() {
            return "push";
        }

        @Override
        public int priority() {
            return 2000;
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

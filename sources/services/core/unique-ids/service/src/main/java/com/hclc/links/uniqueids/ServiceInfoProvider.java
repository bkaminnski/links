package com.hclc.links.uniqueids;

import com.hclc.libs.identification.ServiceInfo;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

public class ServiceInfoProvider {

    private final static ServiceInfo INSTANCE = new ServiceInfo() {
        @Override
        public String serviceName() {
            return "unique-ids";
        }

        @Override
        public int priority() {
            return 1000;
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

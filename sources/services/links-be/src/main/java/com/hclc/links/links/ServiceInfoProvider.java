package com.hclc.links.links;

import com.hclc.libs.accessibility.ServiceInfo;
import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

public class ServiceInfoProvider {

    private final static ServiceInfo INSTANCE = new ServiceInfo() {
        @Override
        public String serviceName() {
            return "links";
        }

        @Override
        public String serviceExternalHost() {
            return "localhost";
        }

        @Override
        public int serviceExternalPort() {
            return 8080;
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

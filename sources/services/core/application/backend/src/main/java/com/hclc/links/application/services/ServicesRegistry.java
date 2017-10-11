package com.hclc.links.application.services;

import com.hclc.libs.monitoring.ServiceLogger;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@Named
@Singleton
public class ServicesRegistry {

    @Inject
    ServiceLogger serviceLogger;

    private final Map<String, Service> services = new HashMap<>();

    public void addService(String serviceName, Integer priority) {
        services.put(serviceName, new Service(serviceName, priority));
        serviceLogger.info("url " + serviceName + " was added to services registry");
    }

    public void removeUrlForService(String serviceName) {
        services.remove(serviceName);
        serviceLogger.info("service " + serviceName + " was removed from services registry");
    }

    public Collection<Service> getServices() {
        return Collections.unmodifiableList(services.values().stream().sorted().collect(toList()));
    }
}

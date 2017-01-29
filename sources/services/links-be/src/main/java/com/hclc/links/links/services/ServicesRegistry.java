package com.hclc.links.links.services;

import com.hclc.libs.monitoring.ServiceLogger;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.*;

@Named
@Singleton
public class ServicesRegistry {

    @Inject
    ServiceLogger serviceLogger;

    private final Map<String, String> uiUrlsForServices = new HashMap<>();

    public void addUiUrlForService(String uiUrl, String serviceName) {
        uiUrlsForServices.put(serviceName, uiUrl);
        serviceLogger.info("uiUrl " + uiUrl + " was added to services registry for service " + serviceName);
    }

    public void removeUiUrlForService(String serviceName) {
        String uiUrl = uiUrlsForServices.remove(serviceName);
        serviceLogger.info("uiUrl " + uiUrl + " was removed from services registry for service " + serviceName);
    }

    public Collection<String> getUiUrls() {
        return Collections.unmodifiableList(new ArrayList<>(uiUrlsForServices.values()));
    }
}

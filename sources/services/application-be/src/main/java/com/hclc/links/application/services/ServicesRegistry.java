package com.hclc.links.application.services;

import com.hclc.libs.monitoring.ServiceLogger;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.inject.Named;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Named
@Singleton
public class ServicesRegistry {

    @Inject
    ServiceLogger serviceLogger;

    private final Map<String, UiService> uiUrlsForServices = new HashMap<>();

    public void addUiService(String serviceName, String uiUrl, Integer priority) {
        uiUrlsForServices.put(serviceName, new UiService(serviceName, uiUrl, priority));
        serviceLogger.info("uiUrl " + uiUrl + " was added to services registry for service " + serviceName);
    }

    public void removeUiUrlForService(String serviceName) {
        UiService uiService = uiUrlsForServices.remove(serviceName);
        serviceLogger.info("uiUrl " + uiService.getUrl() + " was removed from services registry for service " + serviceName);
    }

    public Collection<String> getUiUrls() {
        return Collections.unmodifiableList(new ArrayList<>(uiUrlsForServices.values().stream().sorted().map(UiService::getUrl).collect(toList())));
    }
}

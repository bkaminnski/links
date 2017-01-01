package com.hclc.links.links.slices;

import com.hclc.libs.monitoring.ServiceLogger;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.inject.Named;

@Named
@Singleton
public class LinksSlicesRegister {

    @Inject
    ServiceLogger serviceLogger;

    private final Map<String, String> uiUrlsForServices = new HashMap<>();

    public void addUiUrlForService(String uiUrl, String serviceName) {
        uiUrlsForServices.put(serviceName, uiUrl);
        serviceLogger.info("uiUrl " + uiUrl + " was added to slices register for service " + serviceName);
    }

    public void removeUiUrlForService(String serviceName) {
        String uiUrl = uiUrlsForServices.remove(serviceName);
        serviceLogger.info("uiUrl " + uiUrl + " was removed from slices register for service " + serviceName);
    }

    public Collection<String> getUiUrls() {
        return Collections.unmodifiableList(new ArrayList<>(uiUrlsForServices.values()));
    }
}

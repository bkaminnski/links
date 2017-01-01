package com.hclc.links.links.slices;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.Singleton;

@Singleton
public class LinksSlicesRegister {

    private final Map<String, String> uiUrlsForServices = new HashMap<>();

    public void storeUiUrlForService(String uiUrl, String serviceName) {
        uiUrlsForServices.put(serviceName, uiUrl);
    }

    public Collection<String> uiUrls() {
        return uiUrlsForServices.values();
    }
}

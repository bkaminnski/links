package com.hclc.links.descriptions.slices;

import com.hclc.libs.accessibility.ServiceInfo;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.descriptions.EventsNames.thisIsMyLinksSlice;
import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.json.Json;

@Singleton
@Startup
public class LinksSlicesAnnouncer {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    LinksTopic linksTopic;

    @Inject
    ServiceInfo serviceInfo;

    @PostConstruct
    public void announceLinksSlicesOnStartup() {
        generateNewTrackingId();
        announceLinksSlices();
    }

    public void announceLinksSlices() {
        String sliceUiUrl = Json.createObjectBuilder().add("uiUrl", serviceInfo.fullUrlTo("/descriptions/app/app.js")).build().toString();
        linksTopic.sendEventWithPayload(thisIsMyLinksSlice, sliceUiUrl, serviceLogger);
    }
}

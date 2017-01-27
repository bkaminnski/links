package com.hclc.links.keywords.slices;

import com.hclc.libs.accessibility.ServiceInfo;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.keywords.EventsNames.myLinksSliceIsAvailable;
import static com.hclc.links.keywords.EventsNames.myLinksSliceIsUnavailable;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.json.Json;

@Singleton
@Startup
public class LinksSliceAnnouncer {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    LinksTopic linksTopic;

    @Inject
    ServiceInfo serviceInfo;

    @PostConstruct
    public void announceLinksSliceAvailabilityOnStartup() {
        generateNewTrackingId();
        announceLinksSliceAvailability();
    }

    public void announceLinksSliceAvailability() {
        String uiUrlPayload = Json.createObjectBuilder().add("uiUrl", serviceInfo.fullUrlTo("/keywords/app/app.js")).build().toString();
        linksTopic.sendEventWithPayload(myLinksSliceIsAvailable, uiUrlPayload, serviceLogger);
    }

    @PreDestroy
    public void announceLinksSliceUnavailibilityOnDestroy() {
        generateNewTrackingId();
        announceLinksSliceUnavailability();
    }

    public void announceLinksSliceUnavailability() {
        linksTopic.sendEventWithEmptyPayload(myLinksSliceIsUnavailable, serviceLogger);
    }
}

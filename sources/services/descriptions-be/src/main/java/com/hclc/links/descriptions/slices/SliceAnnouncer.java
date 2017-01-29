package com.hclc.links.descriptions.slices;

import com.hclc.libs.accessibility.ServiceInfo;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.descriptions.EventsNames.mySliceIsAvailable;
import static com.hclc.links.descriptions.EventsNames.mySliceIsUnavailable;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.json.Json;

@Singleton
@Startup
public class SliceAnnouncer {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    LinksTopic linksTopic;

    @Inject
    ServiceInfo serviceInfo;

    @PostConstruct
    public void announceSliceAvailabilityOnStartup() {
        generateNewTrackingId();
        announceSliceAvailability();
    }

    public void announceSliceAvailability() {
        String uiUrlPayload = Json.createObjectBuilder().add("uiUrl", serviceInfo.fullUrlTo("/descriptions/app/app.js")).build().toString();
        linksTopic.sendEventWithPayload(mySliceIsAvailable, uiUrlPayload, serviceLogger);
    }

    @PreDestroy
    public void announceSliceUnavailibilityOnDestroy() {
        generateNewTrackingId();
        announceSliceUnavailability();
    }

    public void announceSliceUnavailability() {
        linksTopic.sendEventWithEmptyPayload(mySliceIsUnavailable, serviceLogger);
    }
}

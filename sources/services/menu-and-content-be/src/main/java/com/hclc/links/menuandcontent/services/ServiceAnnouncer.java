package com.hclc.links.menuandcontent.services;

import com.hclc.libs.accessibility.ServiceInfo;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.json.Json;

import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.menuandcontent.EventsNames.myServiceIsAvailable;
import static com.hclc.links.menuandcontent.EventsNames.myServiceIsUnavailable;

@Singleton
@Startup
public class ServiceAnnouncer {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    LinksTopic linksTopic;

    @Inject
    ServiceInfo serviceInfo;

    @PostConstruct
    public void announceServiceAvailabilityOnStartup() {
        generateNewTrackingId();
        announceServiceAvailability();
    }

    public void announceServiceAvailability() {
        String uiUrlPayload = Json.createObjectBuilder().add("uiUrl", serviceInfo.fullUrlTo("/menu-and-content/app/app.js")).build().toString();
        linksTopic.sendEventWithPayload(myServiceIsAvailable, uiUrlPayload, serviceLogger);
    }

    @PreDestroy
    public void announceServiceUnavailibilityOnDestroy() {
        generateNewTrackingId();
        announceServiceUnavailability();
    }

    public void announceServiceUnavailability() {
        linksTopic.sendEventWithEmptyPayload(myServiceIsUnavailable, serviceLogger);
    }
}

package com.hclc.links.about.services;

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
import static com.hclc.links.about.EventsNames.myServiceIsAvailable;
import static com.hclc.links.about.EventsNames.myServiceIsUnavailable;

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
        String payload = Json.createObjectBuilder().add("url", serviceInfo.url()).build().toString();
        linksTopic.sendEventWithPayload(myServiceIsAvailable, payload, serviceLogger);
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

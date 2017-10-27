package com.hclc.libs.discovery;

import com.hclc.libs.events.BackendTopic;
import com.hclc.libs.identification.ServiceInfo;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.json.Json;

import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;

@Singleton
@Startup
public class AvailabilityAnnouncer {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    BackendTopic backendTopic;

    @Inject
    ServiceInfo serviceInfo;

    @PostConstruct
    public void announceServiceAvailabilityOnStartup() {
        generateNewTrackingId();
        announceServiceAvailability();
    }

    public void announceServiceAvailability() {
        String payload = Json.createObjectBuilder()
                .add("priority", serviceInfo.priority())
                .build()
                .toString();
        backendTopic.sendEventWithPayload(EventsNames.myServiceIsAvailable, payload, serviceLogger);
    }

    @PreDestroy
    public void announceServiceUnavailabilityOnDestroy() {
        generateNewTrackingId();
        announceServiceUnavailability();
    }

    public void announceServiceUnavailability() {
        backendTopic.sendEventWithEmptyPayload(EventsNames.myServiceIsUnavailable, serviceLogger);
    }
}

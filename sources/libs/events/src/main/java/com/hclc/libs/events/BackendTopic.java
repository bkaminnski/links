package com.hclc.libs.events;

import com.hclc.libs.identification.ServiceInfo;
import com.hclc.libs.monitoring.ServiceLogger;
import com.hclc.libs.monitoring.TrackingIdHolder;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.UUID;
import javax.annotation.Resource;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Topic;

public class BackendTopic {

    @Resource(lookup = "java:jboss/exported/jms/topic/backend")
    private Topic topic;

    @Inject
    JMSContext context;

    @Inject
    ServiceInfo serviceInfo;

    public void sendEventWithEmptyPayload(EventName eventName, ServiceLogger serviceLogger) {
        sendEventWithPayload(eventName, "", serviceLogger);
    }

    public void sendEventWithPayload(EventName eventName, String payload, ServiceLogger serviceLogger) {
        String formattedNowInUtc = formattedNowInUtc();
        context
                .createProducer()
                .setProperty("messageId", UUID.randomUUID().toString())
                .setProperty("eventName", eventName.getEventName())
                .setProperty("trackingId", TrackingIdHolder.get())
                .setProperty("creationTimestamp", formattedNowInUtc)
                .setProperty("creatingServiceName", serviceInfo.serviceName())
                .send(topic, payload);
        serviceLogger.info("event " + eventName + " created at " + formattedNowInUtc + " was sent");
    }

    private static String formattedNowInUtc() {
        return ZonedDateTime.now(ZoneOffset.UTC).toString();
    }
}

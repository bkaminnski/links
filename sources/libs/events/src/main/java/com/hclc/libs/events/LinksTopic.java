package com.hclc.libs.events;

import com.hclc.libs.accessibility.ServiceInfo;
import com.hclc.libs.monitoring.ServiceLogger;
import com.hclc.libs.monitoring.TrackingIdHolder;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import javax.annotation.Resource;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Topic;

public class LinksTopic {

    @Resource(lookup = "java:jboss/exported/jms/topic/links")
    private Topic topic;

    @Inject
    JMSContext context;

    @Inject
    ServiceInfo serviceInfo;

    public void sendEventWithPayloadAndLog(String eventName, String payload, ServiceLogger serviceLogger) {
        String formattedNowInUtc = formattedNowInUtc();
        context
                .createProducer()
                .setProperty("eventName", eventName)
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

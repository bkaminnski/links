package com.hclc.libs.events;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.identification.ServiceInfo;
import com.hclc.libs.monitoring.ServiceLogger;
import com.hclc.libs.monitoring.TrackingIdHolder;

import javax.jms.JMSContext;
import javax.jms.JMSProducer;
import javax.jms.Topic;
import javax.json.JsonObject;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class BackendEvent {
    private final JMSContext jmsContext;
    private final Topic topic;
    private final EventName eventName;
    private final AuthenticatedUser authenticatedUser;
    private final ServiceLogger serviceLogger;
    private final ServiceInfo serviceInfo;
    private final Map<String, String> customProperties = new HashMap<>();
    private String payload = "";

    BackendEvent(JMSContext jmsContext, Topic topic, ServiceInfo serviceInfo, EventName eventName, AuthenticatedUser authenticatedUser, ServiceLogger serviceLogger) {
        this.jmsContext = jmsContext;
        this.topic = topic;
        this.eventName = eventName;
        this.authenticatedUser = authenticatedUser;
        this.serviceLogger = serviceLogger;
        this.serviceInfo = serviceInfo;
    }

    public BackendEvent withProperty(String name, String value) {
        customProperties.put(name, value);
        return this;
    }

    public BackendEvent withPayload(String payload) {
        this.payload = payload;
        return this;
    }

    public BackendEvent withPayload(JsonObject payload) {
        this.payload = payload.toString();
        return this;
    }

    public void send() {
        String formattedNowInUtc = formattedNowInUtc();
        JMSProducer jmsProducer = jmsContext.createProducer();
        customProperties.forEach(jmsProducer::setProperty);
        jmsProducer.setProperty("messageId", UUID.randomUUID().toString())
                .setProperty("eventName", eventName.getEventName())
                .setProperty("authenticatedUser", authenticatedUser.toJson().toString())
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

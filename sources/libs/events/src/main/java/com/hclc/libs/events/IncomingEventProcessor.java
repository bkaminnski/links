package com.hclc.libs.events;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.monitoring.ServiceLogger;
import com.hclc.libs.monitoring.TrackingIdHolder;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.json.Json;
import java.io.StringReader;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.UUID;

import static com.hclc.libs.events.IncomingEvent.incomingEvent;
import static java.time.ZonedDateTime.now;

public class IncomingEventProcessor {

    public static IncomingEvent processIncomingEvent(Message message, ServiceLogger serviceLogger) throws JMSException {
        ZonedDateTime receptionTimestamp = now(ZoneOffset.UTC);
        IncomingEvent incomingEvent = incomingEvent()
                .withEventName(message.getStringProperty("eventName"))
                .withMessageId(UUID.randomUUID().toString())
                .withAuthenticatedUser(
                        new AuthenticatedUser(
                                Json.createReader(
                                        new StringReader(message.getStringProperty("authenticatedUser"))
                                ).readObject()
                        )
                ).withTrackingId(message.getStringProperty("trackingId"))
                .withCreatingServiceName(message.getStringProperty("creatingServiceName"))
                .withCreationTimestamp(message.getStringProperty("creationTimestamp"))
                .withReceptionTimestamp(receptionTimestamp)
                .withPayload(message.getBody(String.class));
        TrackingIdHolder.set(incomingEvent.getTrackingId());
        serviceLogger.info("event " + incomingEvent.getEventName()
                + " created at " + incomingEvent.getCreationTimestamp()
                + " by service " + incomingEvent.getCreatingServiceName()
                + " was received at " + incomingEvent.getReceptionTimestamp());
        return incomingEvent;
    }
}

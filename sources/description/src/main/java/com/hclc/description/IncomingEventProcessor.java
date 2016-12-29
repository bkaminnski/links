package com.hclc.description;

import static com.hclc.description.IncomingEvent.incomingEvent;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import static java.time.ZonedDateTime.now;
import javax.jms.JMSException;
import javax.jms.Message;

public class IncomingEventProcessor {

    public static IncomingEvent processIncomingEvent(Message message, ServiceLogger serviceLogger) throws JMSException {
        ZonedDateTime receptionTimestamp = now(ZoneOffset.UTC);
        IncomingEvent incomingEvent = incomingEvent()
                .withEventName(message.getStringProperty("eventName"))
                .withTrackingId(message.getStringProperty("trackingId"))
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

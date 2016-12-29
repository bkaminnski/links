package com.hclc.libs.events;

import java.time.ZonedDateTime;

public class IncomingEvent {

    private final String eventName, trackingId, creatingServiceName, payload;

    private final ZonedDateTime creationTimestamp, receptionTimestamp;

    private IncomingEvent(String eventName, String trackingId, String creatingServiceName, String creationTimestamp, ZonedDateTime receptionTimestamp, String payload) {
        this.eventName = eventName;
        this.trackingId = trackingId;
        this.creatingServiceName = creatingServiceName;
        this.creationTimestamp = ZonedDateTime.parse(creationTimestamp);
        this.receptionTimestamp = receptionTimestamp;
        this.payload = payload;
    }

    public String getEventName() {
        return eventName;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public String getCreatingServiceName() {
        return creatingServiceName;
    }

    public String getPayload() {
        return payload;
    }

    public ZonedDateTime getCreationTimestamp() {
        return creationTimestamp;
    }

    public ZonedDateTime getReceptionTimestamp() {
        return receptionTimestamp;
    }

    public static IncomingEventBuilder incomingEvent() {
        return eventName -> trackingId -> creatingServiceName -> creationTimestamp -> receptionTimestamp -> payload -> new IncomingEvent(eventName, trackingId, creatingServiceName, creationTimestamp, receptionTimestamp, payload);
    }

    interface IncomingEventBuilder {

        TrackingId withEventName(String eventName);
    }

    interface TrackingId {

        CreatingServiceName withTrackingId(String trackingId);
    }

    interface CreatingServiceName {

        CreationTimestamp withCreatingServiceName(String creatingServiceName);
    }

    interface CreationTimestamp {

        ReceptionTimestamp withCreationTimestamp(String creationTimestamp);
    }

    interface ReceptionTimestamp {

        Payload withReceptionTimestamp(ZonedDateTime receptionTimestamp);
    }

    interface Payload {

        IncomingEvent withPayload(String payload);
    }
}

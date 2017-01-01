package com.hclc.libs.events;

import java.io.StringReader;
import java.time.ZonedDateTime;
import javax.json.Json;
import javax.json.JsonObject;

public class IncomingEvent {

    private final EventName eventName;

    private final String trackingId, creatingServiceName, payload;

    private JsonObject payloadAsJsonObject;

    private final ZonedDateTime creationTimestamp, receptionTimestamp;

    private IncomingEvent(final String eventName, String trackingId, String creatingServiceName, String creationTimestamp, ZonedDateTime receptionTimestamp, String payload) {
        this.eventName = new EventName(eventName);
        this.trackingId = trackingId;
        this.creatingServiceName = creatingServiceName;
        this.creationTimestamp = ZonedDateTime.parse(creationTimestamp);
        this.receptionTimestamp = receptionTimestamp;
        this.payload = payload;
    }

    public EventName getEventName() {
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

    private JsonObject payloadAsJsonObject() {
        if (payloadAsJsonObject == null) {
            payloadAsJsonObject = Json.createReader(new StringReader(getPayload())).readObject();
        }
        return payloadAsJsonObject;
    }

    public String getStringPropertyFromJsonPayload(String propertyName) {
        return payloadAsJsonObject().getString(propertyName);
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

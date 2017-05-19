package com.hclc.libs.events;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import java.io.StringReader;
import java.time.ZonedDateTime;

public class IncomingEvent {

    private final EventName eventName;

    private final String messageId, trackingId, creatingServiceName, payload;

    private JsonObject payloadAsJsonObject;

    private final ZonedDateTime creationTimestamp, receptionTimestamp;

    private IncomingEvent(final String eventName, String messageId, String trackingId, String creatingServiceName, String creationTimestamp, ZonedDateTime receptionTimestamp, String payload) {
        this.eventName = new EventName(eventName);
        this.messageId = messageId;
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

    public Integer getIntegerPropertyFromJsonPayload(String propertyName) {
        return payloadAsJsonObject().getJsonNumber(propertyName) == null ? null : payloadAsJsonObject().getInt(propertyName);
    }

    public ZonedDateTime getCreationTimestamp() {
        return creationTimestamp;
    }

    public ZonedDateTime getReceptionTimestamp() {
        return receptionTimestamp;
    }

    public static IncomingEventBuilder incomingEvent() {
        return eventName -> messageId -> trackingId -> creatingServiceName -> creationTimestamp -> receptionTimestamp -> payload -> new IncomingEvent(eventName, messageId, trackingId, creatingServiceName, creationTimestamp, receptionTimestamp, payload);
    }

    public JsonObjectBuilder toJson() {
        return Json
                .createObjectBuilder()
                .add("eventName", eventName.toString())
                .add("messageId", messageId)
                .add("trackingId", trackingId)
                .add("creatingServiceName", creatingServiceName)
                .add("creationTimestamp", creationTimestamp.toString())
                .add("receptionTimestamp", receptionTimestamp.toString())
                .add("payload", payload == null ? "" : payload);
    }

    interface IncomingEventBuilder {

        MessageId withEventName(String eventName);
    }

    interface MessageId {

        TrackingId withMessageId(String messageId);
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

package com.hclc.libs.events;

import javax.json.Json;
import javax.json.JsonObject;

import static javax.json.Json.createObjectBuilder;

public class UiEvent {
    private final BackendEvent backendEvent;
    private JsonObject uiEventPayload = Json.createObjectBuilder().build();
    private String uiEventName;

    public UiEvent withUiEventName(String uiEventName) {
        this.uiEventName = uiEventName;
        return this;
    }

    public UiEvent withUiEventPayload(JsonObject uiEventPayload) {
        this.uiEventPayload = uiEventPayload;
        return this;
    }

    UiEvent(BackendEvent backendEvent) {
        this.backendEvent = backendEvent;
    }

    public void send() {
        backendEvent.withPayload(createObjectBuilder()
                .add("uiEventName", uiEventName)
                .add("uiEventPayload", uiEventPayload)
                .build()
        ).send();
    }
}

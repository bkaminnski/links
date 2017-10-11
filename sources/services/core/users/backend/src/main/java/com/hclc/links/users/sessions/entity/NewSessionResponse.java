package com.hclc.links.users.sessions.entity;

import javax.json.Json;
import javax.json.JsonObjectBuilder;

public class NewSessionResponse {
    private final String sessionId;

    public NewSessionResponse(String sessionId) {
        this.sessionId = sessionId;
    }

    public JsonObjectBuilder toJson() {
        return Json
                .createObjectBuilder()
                .add("sessionId", sessionId);
    }
}

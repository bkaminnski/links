package com.hclc.links.integrationtest.api.features.login;

import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.client.WebTarget;

import static javax.ws.rs.client.Entity.json;

public class LoginFeature {

    private final WebTarget target;

    public LoginFeature(WebTarget target) {
        this.target = target;
    }

    public String logUserIn(String email, String password) {
        JsonObject requestPayload = Json.createObjectBuilder()
                .add("email", email)
                .add("password", password)
                .build();
        return target.path("/users/resources/authenticationRequests")
                .request()
                .post(json(requestPayload))
                .readEntity(JsonObject.class)
                .getString("cuiAuthenticationToken");
    }
}

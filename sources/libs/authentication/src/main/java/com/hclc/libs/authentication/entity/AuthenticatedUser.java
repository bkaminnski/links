package com.hclc.libs.authentication.entity;

import javax.json.JsonObject;
import java.security.Principal;

import static javax.json.Json.createObjectBuilder;

public class AuthenticatedUser implements Principal {

    private static final String SYSTEM_USER_ID = "SYSTEM_USER_ID";
    private static final String SYSTEM_USER_EMAIL = "SYSTEM_USER_EMAIL";

    public static final AuthenticatedUser SYSTEM_USER = new AuthenticatedUser(SYSTEM_USER_ID, SYSTEM_USER_EMAIL);

    private final String id, email;

    public AuthenticatedUser(JsonObject jsonObject) {
        id = jsonObject.getString("id");
        email = jsonObject.getString("email");
    }

    public AuthenticatedUser(String id, String email) {
        this.id = id;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getName() {
        return email;
    }

    public JsonObject toJson() {
        return createObjectBuilder()
                .add("id", this.id)
                .add("email", this.email)
                .build();
    }

    public boolean isSystemUser() {
        return this.equals(SYSTEM_USER);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AuthenticatedUser that = (AuthenticatedUser) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

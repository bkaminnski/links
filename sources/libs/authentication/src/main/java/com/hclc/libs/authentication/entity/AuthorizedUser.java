package com.hclc.libs.authentication.entity;

public class AuthorizedUser {

    private final String id, email;

    public AuthorizedUser(String id, String email) {
        this.id = id;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}

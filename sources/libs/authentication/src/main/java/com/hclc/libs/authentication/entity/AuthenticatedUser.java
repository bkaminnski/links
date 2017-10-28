package com.hclc.libs.authentication.entity;

import java.security.Principal;

public class AuthenticatedUser implements Principal {

    private final String id, email;

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
}

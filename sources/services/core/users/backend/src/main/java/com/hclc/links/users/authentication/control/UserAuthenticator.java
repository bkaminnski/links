package com.hclc.links.users.authentication.control;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.links.users.authentication.entity.AuthenticationRequest;

import java.util.Optional;
import java.util.UUID;

import static java.util.Optional.empty;
import static java.util.Optional.of;

public class UserAuthenticator {

    public Optional<AuthenticatedUser> authenticate(AuthenticationRequest authenticationRequest) {
        if ("admin".equals(authenticationRequest.getEmail()) && "admin".equals(authenticationRequest.getPassword()))
            return of(new AuthenticatedUser(UUID.randomUUID().toString(), authenticationRequest.getEmail()));

        return empty();
    }
}

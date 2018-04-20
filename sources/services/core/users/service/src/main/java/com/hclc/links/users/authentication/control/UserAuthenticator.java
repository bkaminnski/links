package com.hclc.links.users.authentication.control;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.links.users.authentication.entity.AuthenticationRequest;

import java.util.Optional;
import java.util.regex.Pattern;

import static java.util.Optional.empty;
import static java.util.Optional.of;

public class UserAuthenticator {

    public Optional<AuthenticatedUser> authenticate(AuthenticationRequest authenticationRequest) {
        if (emailIsValid(authenticationRequest.getEmail()) && "admin".equals(authenticationRequest.getPassword()))
            return of(new AuthenticatedUser(authenticationRequest.getEmail(), authenticationRequest.getEmail()));

        return empty();
    }

    private boolean emailIsValid(String email) {
        return Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE).matcher(email).find();
    }
}
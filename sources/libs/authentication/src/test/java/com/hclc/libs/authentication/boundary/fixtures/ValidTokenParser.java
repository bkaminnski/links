package com.hclc.libs.authentication.boundary.fixtures;

import com.hclc.libs.authentication.control.TokenParser;
import com.hclc.libs.authentication.entity.AuthenticatedUser;

import java.util.Optional;

public class ValidTokenParser extends TokenParser {

    private AuthenticatedUser authenticatedUser;

    @Override
    public Optional<AuthenticatedUser> parse(String cuiAuthenticationToken, String jwtSignature) {
        authenticatedUser = new AuthenticatedUser("validId", "validEmail");
        return Optional.of(authenticatedUser);
    }

    public AuthenticatedUser getAuthenticatedUser() {
        return authenticatedUser;
    }
}

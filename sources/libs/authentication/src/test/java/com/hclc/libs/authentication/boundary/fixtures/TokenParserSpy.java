package com.hclc.libs.authentication.boundary.fixtures;

import com.hclc.libs.authentication.control.TokenParser;
import com.hclc.libs.authentication.entity.AuthenticatedUser;

import java.util.Optional;

public class TokenParserSpy extends TokenParser {

    private boolean parseWasCalled = false;

    @Override
    public Optional<AuthenticatedUser> parse(String cuiAuthenticationToken, String jwtSignature) {
        parseWasCalled = true;
        return Optional.empty();
    }

    public boolean parseWasCalled() {
        return parseWasCalled;
    }
}

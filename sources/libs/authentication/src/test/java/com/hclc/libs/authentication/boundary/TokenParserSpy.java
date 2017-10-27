package com.hclc.libs.authentication.boundary;

import com.hclc.libs.authentication.control.TokenParser;
import com.hclc.libs.authentication.entity.AuthorizedUser;

import java.util.Optional;

class TokenParserSpy extends TokenParser {

    private boolean parseWasCalled = false;

    @Override
    public Optional<AuthorizedUser> parse(String cuiAuthenticationToken, String jwtSignature) {
        parseWasCalled = true;
        return Optional.empty();
    }

    boolean parseWasCalled() {
        return parseWasCalled;
    }
}

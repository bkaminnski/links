package com.hclc.libs.authentication.boundary.fixtures;

import com.hclc.libs.authentication.control.TokenParser;
import com.hclc.libs.authentication.entity.AuthenticatedUser;

import java.util.Optional;

public class InvalidTokenParser extends TokenParser {
    
    @Override
    public Optional<AuthenticatedUser> parse(String cuiAuthenticationToken, String jwtSignature) {
        return Optional.empty();
    }
}

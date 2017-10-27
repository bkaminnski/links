package com.hclc.libs.authentication.boundary;

import com.hclc.libs.authentication.control.TokenParser;
import com.hclc.libs.authentication.entity.AuthorizedUser;

import java.util.Optional;

class InvalidTokenParser extends TokenParser {
    
    @Override
    public Optional<AuthorizedUser> parse(String cuiAuthenticationToken, String jwtSignature) {
        return Optional.empty();
    }
}

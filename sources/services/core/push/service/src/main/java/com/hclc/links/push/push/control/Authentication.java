package com.hclc.links.push.push.control;

import com.hclc.libs.authentication.control.JwtSignatureProvider;
import com.hclc.libs.authentication.control.TokenParser;
import com.hclc.libs.authentication.entity.AuthenticatedUser;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.io.IOException;
import java.util.Optional;

@Stateless
public class Authentication {

    @Inject
    JwtSignatureProvider jwtSignatureProvider;

    @Inject
    TokenParser tokenParser;

    public Optional<AuthenticatedUser> authenticate(String jwtToken) throws IOException {
        Optional<String> jwtSignature = jwtSignatureProvider.provide();
        if (!jwtSignature.isPresent()) {
            return Optional.empty();
        }

        return tokenParser.parse(jwtToken, jwtSignature.get());
    }
}

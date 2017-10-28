package com.hclc.libs.authentication.boundary.fixtures;

import com.hclc.libs.authentication.control.JwtSignatureProvider;

import java.util.Optional;

public class InvalidJwtSignatureProvider extends JwtSignatureProvider {

    @Override
    public Optional<String> provide() {
        return Optional.empty();
    }
}

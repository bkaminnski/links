package com.hclc.libs.authentication.boundary;

import com.hclc.libs.authentication.control.JwtSignatureProvider;

import java.util.Optional;

class InvalidJwtSignatureProvider extends JwtSignatureProvider {

    @Override
    public Optional<String> provide() {
        return Optional.empty();
    }
}

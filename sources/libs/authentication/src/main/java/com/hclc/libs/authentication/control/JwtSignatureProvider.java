package com.hclc.libs.authentication.control;

import com.hclc.libs.authentication.boundary.AuthorizationFilter;

import java.util.Optional;
import java.util.logging.Logger;

public class JwtSignatureProvider {

    private static final Logger LOG = Logger.getLogger(AuthorizationFilter.class.getName());

    public Optional<String> provide() {
        String jwtSignature = System.getProperty("jwtSignature");
        if (!jwtSignatureIsProvided(jwtSignature)) {
            logMissingJwtSignature();
            return Optional.empty();
        }
        return Optional.of(jwtSignature);
    }

    private boolean jwtSignatureIsProvided(String jwtSignature) {
        return jwtSignature != null && !jwtSignature.trim().isEmpty();
    }

    private void logMissingJwtSignature() {
        LOG.severe("jwtSignature system property is missing");
    }
}

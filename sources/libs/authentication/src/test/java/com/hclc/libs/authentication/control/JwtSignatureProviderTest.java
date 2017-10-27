package com.hclc.libs.authentication.control;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class JwtSignatureProviderTest {
    private JwtSignatureProvider jwtSignatureProvider;

    @BeforeEach
    void beforeEach() {
        jwtSignatureProvider = new JwtSignatureProvider();
    }

    @Test
    void whenJwtSignatureSystemPropertyIsMissing_shouldReturnEmptyOptional() {
        System.clearProperty("jwtSignature");

        Optional<String> jwtSignature = jwtSignatureProvider.provide();

        assertThat(jwtSignature).isEmpty();
    }

    @Test
    void whenJwtSignatureSystemPropertyIsSet_shouldReturnNonEmptyOptional() {
        System.setProperty("jwtSignature", "correct value");

        Optional<String> jwtSignature = jwtSignatureProvider.provide();

        assertThat(jwtSignature).isNotEmpty();
    }

    @Test
    void whenJwtSignatureSystemPropertyIsSet_shouldReturnThisProperty() {
        String correctValue = "correct value";
        System.setProperty("jwtSignature", correctValue);

        Optional<String> jwtSignature = jwtSignatureProvider.provide();

        assertThat(jwtSignature).contains(correctValue);
    }
}
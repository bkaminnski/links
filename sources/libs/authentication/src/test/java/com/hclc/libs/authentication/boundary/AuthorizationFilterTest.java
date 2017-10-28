package com.hclc.libs.authentication.boundary;

import com.hclc.libs.authentication.boundary.fixtures.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static java.time.Duration.ofMillis;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTimeout;

class AuthorizationFilterTest {

    private AuthorizationFilter authorizationFilter;

    @BeforeEach
    void beforeEach() {
        authorizationFilter = new AuthorizationFilter();
    }

    @Test
    void whenJwtSignatureIsInvalid_shouldAbort() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new InvalidJwtSignatureProvider();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authorizationFilter.filter(requestContextSpy);

        assertThatRequestWasAborted(requestContextSpy);
    }

    @Test
    void whenJwtSignatureIsInvalid_shouldReturnImmediately() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new InvalidJwtSignatureProvider();
        ArtificialPauseSpy artificialPause = new ArtificialPauseSpy();
        authorizationFilter.artificialPause = artificialPause;

        authorizationFilter.filter(new ContainerRequestContextSpy());

        assertThat(artificialPause.pauseWasExecuted()).isFalse();
    }

    @Test
    void whenJwtSignatureIsInvalid_shouldNotTryParsingToken() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new InvalidJwtSignatureProvider();
        TokenParserSpy tokenParserSpy = new TokenParserSpy();
        authorizationFilter.tokenParser = tokenParserSpy;

        authorizationFilter.filter(new ContainerRequestContextSpy());

        assertThat(tokenParserSpy.parseWasCalled()).isFalse();
    }

    @Test
    void whenJwtSignatureIsValid_shouldParseToken() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        TokenParserSpy tokenParserSpy = new TokenParserSpy();
        authorizationFilter.tokenParser = tokenParserSpy;
        authorizationFilter.artificialPause = new ArtificialPauseSpy();

        authorizationFilter.filter(new ContainerRequestContextSpy());

        assertThat(tokenParserSpy.parseWasCalled()).isTrue();
    }

    @Test
    void whenTokenIsInvalid_shouldAbort() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        authorizationFilter.tokenParser = new InvalidTokenParser();
        authorizationFilter.artificialPause = new ArtificialPauseSpy();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authorizationFilter.filter(requestContextSpy);

        assertThatRequestWasAborted(requestContextSpy);
    }

    @Test
    void whenTokenIsInvalid_shouldIntroduceArtificialPause() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        authorizationFilter.tokenParser = new InvalidTokenParser();
        ArtificialPauseSpy artificialPause = new ArtificialPauseSpy();
        authorizationFilter.artificialPause = artificialPause;

        authorizationFilter.filter(new ContainerRequestContextSpy());

        assertThat(artificialPause.pauseWasExecuted()).isTrue();
    }

    @Test
    void whenTokenIsValid_shouldNotAbort() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        authorizationFilter.tokenParser = new ValidTokenParser();
        authorizationFilter.artificialPause = new ArtificialPauseSpy();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authorizationFilter.filter(requestContextSpy);

        assertThat(requestContextSpy.abortedWith()).isNull();
    }

    @Test
    void whenTokenIsValid_shouldNotIntroduceArtificialPause() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        authorizationFilter.tokenParser = new ValidTokenParser();
        ArtificialPauseSpy artificialPause = new ArtificialPauseSpy();
        authorizationFilter.artificialPause = artificialPause;

        authorizationFilter.filter(new ContainerRequestContextSpy());

        assertThat(artificialPause.pauseWasExecuted()).isFalse();
    }


    @Test
    void whenTokenIsValid_shouldPutAuthenticatedInSecurityContext() throws IOException {
        authorizationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authorizationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        ValidTokenParser validTokenParser = new ValidTokenParser();
        authorizationFilter.tokenParser = validTokenParser;
        authorizationFilter.artificialPause = new ArtificialPauseSpy();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authorizationFilter.filter(requestContextSpy);

        assertThat(requestContextSpy.getSecurityContext().getUserPrincipal()).isSameAs(validTokenParser.getAuthenticatedUser());
    }


    @Test
    void whenUnsafeEndpoint_shouldNotAbort() throws IOException {
        authorizationFilter.resourceInfo = new UnsafeEndpointResouceInfo();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authorizationFilter.filter(requestContextSpy);

        assertThat(requestContextSpy.abortedWith()).isNull();
    }

    @Test
    void whenUnsafeEndpoint_shouldReturnImmediately() throws IOException {
        authorizationFilter.resourceInfo = new UnsafeEndpointResouceInfo();

        assertTimeout(ofMillis(200), () -> {
            authorizationFilter.filter(new ContainerRequestContextSpy());
        });
    }

    @Test
    void whenUnsafeEndpoint_shouldNotTryParsingToken() throws IOException {
        authorizationFilter.resourceInfo = new UnsafeEndpointResouceInfo();
        TokenParserSpy tokenParserSpy = new TokenParserSpy();
        authorizationFilter.tokenParser = tokenParserSpy;

        authorizationFilter.filter(new ContainerRequestContextSpy());

        assertThat(tokenParserSpy.parseWasCalled()).isFalse();
    }

    private void assertThatRequestWasAborted(ContainerRequestContextSpy requestContextSpy) {
        assertThat(requestContextSpy.abortedWith().getStatus()).isEqualTo(UNAUTHORIZED.getStatusCode());
    }
}
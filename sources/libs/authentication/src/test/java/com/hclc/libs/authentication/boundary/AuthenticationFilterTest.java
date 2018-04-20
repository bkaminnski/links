package com.hclc.libs.authentication.boundary;

import com.hclc.libs.authentication.boundary.fixtures.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static java.time.Duration.ofMillis;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTimeout;

class AuthenticationFilterTest {

    private AuthenticationFilter authenticationFilter;

    @BeforeEach
    void beforeEach() {
        authenticationFilter = new AuthenticationFilter();
    }

    @Test
    void whenJwtSignatureIsInvalid_shouldAbort() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new InvalidJwtSignatureProvider();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authenticationFilter.filter(requestContextSpy);

        assertThatRequestWasAborted(requestContextSpy);
    }

    @Test
    void whenJwtSignatureIsInvalid_shouldReturnImmediately() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new InvalidJwtSignatureProvider();
        ArtificialPauseSpy artificialPause = new ArtificialPauseSpy();
        authenticationFilter.artificialPause = artificialPause;

        authenticationFilter.filter(new ContainerRequestContextSpy());

        assertThat(artificialPause.pauseWasExecuted()).isFalse();
    }

    @Test
    void whenJwtSignatureIsInvalid_shouldNotTryParsingToken() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new InvalidJwtSignatureProvider();
        TokenParserSpy tokenParserSpy = new TokenParserSpy();
        authenticationFilter.tokenParser = tokenParserSpy;

        authenticationFilter.filter(new ContainerRequestContextSpy());

        assertThat(tokenParserSpy.parseWasCalled()).isFalse();
    }

    @Test
    void whenJwtSignatureIsValid_shouldParseToken() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        TokenParserSpy tokenParserSpy = new TokenParserSpy();
        authenticationFilter.tokenParser = tokenParserSpy;
        authenticationFilter.artificialPause = new ArtificialPauseSpy();

        authenticationFilter.filter(new ContainerRequestContextSpy());

        assertThat(tokenParserSpy.parseWasCalled()).isTrue();
    }

    @Test
    void whenTokenIsInvalid_shouldAbort() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        authenticationFilter.tokenParser = new InvalidTokenParser();
        authenticationFilter.artificialPause = new ArtificialPauseSpy();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authenticationFilter.filter(requestContextSpy);

        assertThatRequestWasAborted(requestContextSpy);
    }

    @Test
    void whenTokenIsInvalid_shouldIntroduceArtificialPause() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        authenticationFilter.tokenParser = new InvalidTokenParser();
        ArtificialPauseSpy artificialPause = new ArtificialPauseSpy();
        authenticationFilter.artificialPause = artificialPause;

        authenticationFilter.filter(new ContainerRequestContextSpy());

        assertThat(artificialPause.pauseWasExecuted()).isTrue();
    }

    @Test
    void whenTokenIsValid_shouldNotAbort() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        authenticationFilter.tokenParser = new ValidTokenParser();
        authenticationFilter.artificialPause = new ArtificialPauseSpy();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authenticationFilter.filter(requestContextSpy);

        assertThat(requestContextSpy.abortedWith()).isNull();
    }

    @Test
    void whenTokenIsValid_shouldNotIntroduceArtificialPause() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        authenticationFilter.tokenParser = new ValidTokenParser();
        ArtificialPauseSpy artificialPause = new ArtificialPauseSpy();
        authenticationFilter.artificialPause = artificialPause;

        authenticationFilter.filter(new ContainerRequestContextSpy());

        assertThat(artificialPause.pauseWasExecuted()).isFalse();
    }


    @Test
    void whenTokenIsValid_shouldPutAuthenticatedInSecurityContext() throws IOException {
        authenticationFilter.resourceInfo = new SafeEndpointResouceInfo();
        authenticationFilter.jwtSignatureProvider = new ValidJwtSignatureProvider();
        ValidTokenParser validTokenParser = new ValidTokenParser();
        authenticationFilter.tokenParser = validTokenParser;
        authenticationFilter.artificialPause = new ArtificialPauseSpy();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authenticationFilter.filter(requestContextSpy);

        assertThat(requestContextSpy.getSecurityContext().getUserPrincipal()).isSameAs(validTokenParser.getAuthenticatedUser());
    }


    @Test
    void whenUnsafeEndpoint_shouldNotAbort() throws IOException {
        authenticationFilter.resourceInfo = new UnsafeEndpointResouceInfo();
        ContainerRequestContextSpy requestContextSpy = new ContainerRequestContextSpy();

        authenticationFilter.filter(requestContextSpy);

        assertThat(requestContextSpy.abortedWith()).isNull();
    }

    @Test
    void whenUnsafeEndpoint_shouldReturnImmediately() throws IOException {
        authenticationFilter.resourceInfo = new UnsafeEndpointResouceInfo();

        assertTimeout(ofMillis(200), () -> {
            authenticationFilter.filter(new ContainerRequestContextSpy());
        });
    }

    @Test
    void whenUnsafeEndpoint_shouldNotTryParsingToken() throws IOException {
        authenticationFilter.resourceInfo = new UnsafeEndpointResouceInfo();
        TokenParserSpy tokenParserSpy = new TokenParserSpy();
        authenticationFilter.tokenParser = tokenParserSpy;

        authenticationFilter.filter(new ContainerRequestContextSpy());

        assertThat(tokenParserSpy.parseWasCalled()).isFalse();
    }

    private void assertThatRequestWasAborted(ContainerRequestContextSpy requestContextSpy) {
        assertThat(requestContextSpy.abortedWith().getStatus()).isEqualTo(UNAUTHORIZED.getStatusCode());
    }
}
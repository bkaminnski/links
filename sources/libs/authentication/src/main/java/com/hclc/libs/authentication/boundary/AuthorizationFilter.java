package com.hclc.libs.authentication.boundary;

import com.hclc.libs.authentication.control.ArtificialPause;
import com.hclc.libs.authentication.control.JwtSignatureProvider;
import com.hclc.libs.authentication.control.TokenParser;
import com.hclc.libs.authentication.entity.AuthorizedUser;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.Optional;

import static javax.ws.rs.Priorities.AUTHENTICATION;

@Provider
@Priority(AUTHENTICATION)
public class AuthorizationFilter implements ContainerRequestFilter {

    @Inject
    JwtSignatureProvider jwtSignatureProvider;

    @Inject
    TokenParser tokenParser;

    @Inject
    ArtificialPause artificialPause;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        Optional<String> jwtSignature = jwtSignatureProvider.provide();
        if (!jwtSignature.isPresent()) {
            abort(requestContext);
            return;
        }

        String cuiAuthenticationToken = requestContext.getHeaderString("CUI-Authentication-Token");
        Optional<AuthorizedUser> authorizedUser = tokenParser.parse(cuiAuthenticationToken, jwtSignature.get());
        if (!authorizedUser.isPresent()) {
            artificialPause.pauseFor200milliseconds();
            abort(requestContext);
            return;
        }
    }

    private void abort(ContainerRequestContext requestContext) {
        requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
    }
}

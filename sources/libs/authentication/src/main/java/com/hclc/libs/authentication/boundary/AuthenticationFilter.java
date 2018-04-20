package com.hclc.libs.authentication.boundary;

import com.hclc.libs.authentication.control.ArtificialPause;
import com.hclc.libs.authentication.control.JwtSignatureProvider;
import com.hclc.libs.authentication.control.TokenParser;
import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.authentication.entity.AuthenticatedUserSecurityContext;
import com.hclc.libs.authentication.entity.UnsafeEndpoint;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.Optional;

import static javax.ws.rs.Priorities.AUTHENTICATION;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;
import static javax.ws.rs.core.Response.status;

@Provider
@Priority(AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

    @Inject
    JwtSignatureProvider jwtSignatureProvider;

    @Inject
    TokenParser tokenParser;

    @Inject
    ArtificialPause artificialPause;

    @Context
    ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        if (resourceInfo.getResourceMethod().getAnnotation(UnsafeEndpoint.class) != null) {
            return;
        }

        Optional<String> jwtSignature = jwtSignatureProvider.provide();
        if (!jwtSignature.isPresent()) {
            abortWithUnauthorizedStatusCode(requestContext);
            return;
        }

        String cuiAuthenticationToken = requestContext.getHeaderString("CUI-Authentication-Token");
        Optional<AuthenticatedUser> authenticatedUser = tokenParser.parse(cuiAuthenticationToken, jwtSignature.get());
        if (!authenticatedUser.isPresent()) {
            artificialPause.pauseFor200milliseconds();
            abortWithUnauthorizedStatusCode(requestContext);
            return;
        }

        requestContext.setSecurityContext(new AuthenticatedUserSecurityContext(authenticatedUser.get(), requestContext.getUriInfo().getRequestUri().getScheme()));
    }

    private void abortWithUnauthorizedStatusCode(ContainerRequestContext requestContext) {
        requestContext.abortWith(status(UNAUTHORIZED).build());
    }
}

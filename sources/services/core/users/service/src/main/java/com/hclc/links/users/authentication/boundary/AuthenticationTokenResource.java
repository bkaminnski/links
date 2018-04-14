package com.hclc.links.users.authentication.boundary;

import com.hclc.libs.authentication.control.JwtSignatureProvider;
import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.links.users.authentication.control.TokenCreator;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.Optional;

import static javax.json.Json.createObjectBuilder;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;
import static javax.ws.rs.core.Response.ok;
import static javax.ws.rs.core.Response.status;

@Stateless
@Path(value = "authenticationToken")
public class AuthenticationTokenResource {

    @Inject
    JwtSignatureProvider jwtSignatureProvider;

    @Inject
    TokenCreator tokenCreator;

    @Context
    SecurityContext securityContext;

    @GET
    @Produces(APPLICATION_JSON)
    public Response refreshToken() {
        Optional<String> jwtSignature = jwtSignatureProvider.provide();
        if (!jwtSignature.isPresent())
            return unauthorizedResponse();

        String cuiAuthenticationToken = tokenCreator.createFrom((AuthenticatedUser) securityContext.getUserPrincipal(), jwtSignature.get());
        return authorizedResponse(cuiAuthenticationToken);
    }

    private Response unauthorizedResponse() {
        return status(UNAUTHORIZED).build();
    }

    private Response authorizedResponse(String cuiAuthenticationToken) {
        return ok(createObjectBuilder().add("cuiAuthenticationToken", cuiAuthenticationToken).build()).build();
    }
}

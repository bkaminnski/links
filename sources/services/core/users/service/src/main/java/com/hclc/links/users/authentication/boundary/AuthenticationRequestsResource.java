package com.hclc.links.users.authentication.boundary;

import com.hclc.libs.authentication.control.JwtSignatureProvider;
import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.authentication.entity.UnsafeEndpoint;
import com.hclc.links.users.authentication.control.TokenCreator;
import com.hclc.links.users.authentication.control.UserAuthenticator;
import com.hclc.links.users.authentication.entity.AuthenticationRequest;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.Optional;

import static javax.json.Json.createObjectBuilder;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;
import static javax.ws.rs.core.Response.ok;
import static javax.ws.rs.core.Response.status;

@Stateless
@Path(value = "authenticationRequests")
public class AuthenticationRequestsResource {

    @Inject
    JwtSignatureProvider jwtSignatureProvider;

    @Inject
    UserAuthenticator userAuthenticator;

    @Inject
    TokenCreator tokenCreator;

    @POST
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    @UnsafeEndpoint
    public Response authenticate(AuthenticationRequest authenticationRequest) {
        Optional<String> jwtSignature = jwtSignatureProvider.provide();
        if (!jwtSignature.isPresent())
            return unauthorizedResponse();

        Optional<AuthenticatedUser> authenticatedUser = userAuthenticator.authenticate(authenticationRequest);
        if (!authenticatedUser.isPresent())
            return unauthorizedResponse();

        String cuiAuthenticationToken = tokenCreator.createFrom(authenticatedUser.get(), jwtSignature.get());
        return authorizedResponse(cuiAuthenticationToken);
    }

    private Response unauthorizedResponse() {
        return status(UNAUTHORIZED).build();
    }

    private Response authorizedResponse(String cuiAuthenticationToken) {
        return ok(createObjectBuilder().add("cuiAuthenticationToken", cuiAuthenticationToken).build()).build();
    }
}

package com.hclc.links.push.push.boundary;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.events.BackendTopic;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.json.Json;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Stateless
@Path(value = "echo")
public class EchoResource {

    @Context
    SecurityContext securityContext;

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    BackendTopic backendTopic;

    @GET
    @Produces(APPLICATION_JSON)
    public Response echo(@QueryParam("value") String value) {
        backendTopic
                .newUiEvent((AuthenticatedUser) securityContext.getUserPrincipal(), serviceLogger)
                .withUiEventName("uiEvent.push.echo")
                .withUiEventPayload(Json.createObjectBuilder().add("value", value).build())
                .send();
        return Response.ok().build();
    }
}

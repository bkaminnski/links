package com.hclc.links.users.sessions.boundary;

import com.hclc.links.users.sessions.entity.NewSessionRequest;
import com.hclc.links.users.sessions.entity.NewSessionResponse;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.util.UUID;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Stateless
@Path(value = "sessions")
public class Sessions {

    @POST
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    public Response create(NewSessionRequest newSessionRequest) {
        if ("admin".equals(newSessionRequest.getPassword()) && "admin".equals(newSessionRequest.getPassword()))
            return Response.ok(new NewSessionResponse(UUID.randomUUID().toString()).toJson().build()).build();

        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}

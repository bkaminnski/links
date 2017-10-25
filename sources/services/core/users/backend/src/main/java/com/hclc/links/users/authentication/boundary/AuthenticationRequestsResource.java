package com.hclc.links.users.authentication.boundary;

import com.hclc.links.users.authentication.entity.AuthenticationRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.ejb.Stateless;
import javax.json.Json;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Stateless
@Path(value = "authenticationRequests")
public class AuthenticationRequestsResource {

    @POST
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    public Response create(AuthenticationRequest authenticationRequest) {
        if ("admin".equals(authenticationRequest.getPassword()) && "admin".equals(authenticationRequest.getPassword())) {

            String compactJws = Jwts.builder()
                    .setSubject("Joe")
                    .signWith(SignatureAlgorithm.HS512, "signature")
                    .compact();


            return Response.ok(Json.createObjectBuilder().add("cuiSessionToken", compactJws).build()).build();
        }

        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}

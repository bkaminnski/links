package com.hclc.links.links.links.boundary;

import com.hclc.links.links.links.entity.Link;
import java.util.List;
import javax.ejb.Stateless;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Stateless
@Path(value = "links")
public class Links {

    @PersistenceContext
    EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response links() {
        return Response.ok(
                ((List<Link>) em.createQuery("select l from Link l")
                        .getResultList())
                        .stream()
                        .map(Link::toJson)
                        .collect(Json::createArrayBuilder, JsonArrayBuilder::add, JsonArrayBuilder::add)
                        .build()
        ).build();
    }
}

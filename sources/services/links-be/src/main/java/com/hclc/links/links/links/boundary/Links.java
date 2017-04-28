package com.hclc.links.links.links.boundary;

import com.hclc.links.links.links.entity.CreateLinkCommand;
import com.hclc.links.links.links.entity.Link;

import javax.ejb.Stateless;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Stateless
@Path(value = "links")
public class Links {

    @PersistenceContext
    EntityManager em;

    @GET
    @Produces(APPLICATION_JSON)
    public Response links() {
        return Response.ok(
                ((List<Link>) em.createQuery("select l from Link l order by l.id desc")
                        .getResultList())
                        .stream()
                        .map(Link::toJson)
                        .collect(Json::createArrayBuilder, JsonArrayBuilder::add, JsonArrayBuilder::add)
                        .build()
        ).build();
    }

    @POST
    @Consumes(APPLICATION_JSON)
    public Response create(CreateLinkCommand createLinkCommand) {
        em.persist(createLinkCommand.toLink());
        return Response.noContent().build();
    }
}

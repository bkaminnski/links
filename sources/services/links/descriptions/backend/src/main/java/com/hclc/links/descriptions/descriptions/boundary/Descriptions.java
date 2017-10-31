package com.hclc.links.descriptions.descriptions.boundary;

import com.hclc.links.descriptions.descriptions.entity.CreateDescriptionCommand;
import com.hclc.links.descriptions.descriptions.entity.Description;

import javax.ejb.Stateless;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Stateless
@Path(value = "descriptions")
public class Descriptions {

    @PersistenceContext
    EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response descriptions() {
        return Response.ok(
                ((List<Description>) em.createQuery("select l from Description l")
                        .getResultList())
                        .stream()
                        .map(Description::toJson)
                        .collect(Json::createArrayBuilder, JsonArrayBuilder::add, JsonArrayBuilder::add)
                        .build()
        ).build();
    }

    @POST
    @Consumes(APPLICATION_JSON)
    public Response create(CreateDescriptionCommand createDescriptionCommand) {
        em.persist(createDescriptionCommand.toDescription());
        return Response.noContent().build();
    }
}

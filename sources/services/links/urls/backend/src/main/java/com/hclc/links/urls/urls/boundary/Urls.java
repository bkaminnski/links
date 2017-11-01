package com.hclc.links.urls.urls.boundary;

import com.hclc.links.urls.urls.entity.CreateUrlCommand;
import com.hclc.links.urls.urls.entity.Url;

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
@Path(value = "urls")
public class Urls {

    @PersistenceContext
    EntityManager em;

    @GET
    @Produces(APPLICATION_JSON)
    public Response urls() {
        return Response.ok(
                ((List<Url>) em.createQuery("select u from Url u order by u.id desc")
                        .getResultList())
                        .stream()
                        .map(Url::toJson)
                        .collect(Json::createArrayBuilder, JsonArrayBuilder::add, JsonArrayBuilder::add)
                        .build()
        ).build();
    }

    @POST
    @Consumes(APPLICATION_JSON)
    public Response create(CreateUrlCommand createUrlCommand) {
        em.persist(createUrlCommand.toUrl());
        return Response.noContent().build();
    }
}

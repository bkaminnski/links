package com.hclc.links.keywords.keywords.boundary;

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
import java.util.List;

@Stateless
@Path(value = "keywords")
public class KeywordsResource {

    @PersistenceContext
    EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response keywords() {
        return Response.ok(
                ((List<com.hclc.links.keywords.keywords.entity.Keywords>) em.createQuery("select k from Keywords k order by k.id desc")
                        .getResultList())
                        .stream()
                        .map(com.hclc.links.keywords.keywords.entity.Keywords::toJson)
                        .collect(Json::createArrayBuilder, JsonArrayBuilder::add, JsonArrayBuilder::add)
                        .build()
        ).build();
    }
}

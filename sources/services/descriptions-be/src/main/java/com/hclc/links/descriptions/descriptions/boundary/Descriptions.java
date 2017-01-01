package com.hclc.links.descriptions.descriptions.boundary;

import com.hclc.links.descriptions.descriptions.entity.Description;
import java.util.List;
import javax.ejb.Stateless;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Stateless
@Path(value = "descriptions")
public class Descriptions {

    @PersistenceContext
    EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response links() {
        return Response.ok(
                ((List<Description>) em.createQuery("select l from Description l")
                        .getResultList())
                        .stream()
                        .map(Description::toJson)
                        .collect(Json::createArrayBuilder, JsonArrayBuilder::add, JsonArrayBuilder::add)
                        .build()
        ).build();
    }
}

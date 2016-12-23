package com.hclc.links.boundary;

import com.hclc.LinksTopicConsumer;
import com.hclc.links.entity.Link;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Topic;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Stateless
@Path(value = "links")
public class Links {

    @Resource(lookup = "java:jboss/exported/jms/topic/links")
    private Topic topic;

    @Inject
    JMSContext context;

    @PersistenceContext
    EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray links() {
        System.out.println("###################################### Eeeee?");
        Logger.getLogger(LinksTopicConsumer.class.getName()).log(Level.INFO, "###################################### Eeeee?");
        context.createProducer().send(topic, "Hello!");
        return ((List<Link>) em.createQuery("select l from Link l")
                .getResultList())
                .stream()
                .map(Link::toJson)
                .collect(Json::createArrayBuilder, JsonArrayBuilder::add, JsonArrayBuilder::add)
                .build();
    }
}

package com.hclc.links.links;

import com.hclc.links.links.links.entity.Link;
import java.util.stream.Stream;
import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Singleton
@Startup
public class LinksInit {

    @PersistenceContext
    EntityManager em;

    @PostConstruct
    public void init() {
        Stream.of(
                new Link("https://www.youtube.com/watch?v=A800BaLBB2k", "Adam Bien, react, JEE", "Java EE becomes an interesting platform for exposing services for mobile apps. To give you a feeling about the productivity, I installed a CORS filter, implemented, built and deployed a Java EE 7 service from scratch, exposed a JSON-array, implemented a HTTP client using stock XMLHttpRequest and rendered the result using the React JavaScript library."),
                new Link("https://www.youtube.com/watch?v=Vt4G-pHXfs4", "Christopher Batey, docker, JVM, Devoxx Poland 2016", "Containers are the latest hype. It goes without saying that Docker for the development environment is a good thing but what about running our production Java applications inside a container?"),
                new Link("https://www.youtube.com/watch?v=w5TupxbnnrM", "Chris Hawkes, react, babel, webpack", "Things change in the JavaScript world so fast nowadays. I feel this video is relatively future proof going into 2017 as to how babel, react and webpack should be used together to make development easier.")
        ).forEach(em::persist);
    }
}

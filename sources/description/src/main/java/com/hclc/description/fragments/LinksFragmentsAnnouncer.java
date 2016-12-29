package com.hclc.description.fragments;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Topic;

@Singleton
@Startup
public class LinksFragmentsAnnouncer {

    private final static Logger LOGGER = Logger.getLogger(LinksFragmentsAnnouncer.class.getName());

    @Resource(lookup = "java:jboss/exported/jms/topic/links")
    private Topic topic;

    @Inject
    JMSContext context;

    @PostConstruct
    public void announceLinkFragments() {
        LOGGER.log(Level.INFO, "announceLinkFragments");
        context
                .createProducer()
                .setProperty("eventName", "thisIsMyLinkFragment")
                .send(topic, "");
        LOGGER.log(Level.INFO, "thisIsMyLinkFragment message was sent");
    }
}

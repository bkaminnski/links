package com.hclc.links.fragments;

import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.Topic;

@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
    , 
    @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/links")
    ,
    @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'thisIsMyLinkFragment' or eventName = 'wakeUp'")
    ,
      @ActivationConfigProperty(propertyName = "maxSession", propertyValue = "1")})
public class LinksFragmentsFinder implements MessageListener {

    private final static Logger LOGGER = Logger.getLogger(LinksFragmentsFinder.class.getName());

    @Resource(lookup = "java:jboss/exported/jms/topic/links")
    private Topic topic;

    @Inject
    JMSContext context;

    @Inject
    FinderPoker finderPoker;

    @PostConstruct
    public void iAmReadyToReceiveLinkFragments() {
        LOGGER.log(Level.INFO, "iAmReadyToReceiveLinkFragments");
        finderPoker.iWokeUpSoStopPoking();
        context
                .createProducer()
                .setProperty("eventName", "giveMeLinkFragments")
                .setProperty("trackingId", UUID.randomUUID().toString())
                .send(topic, "");
        LOGGER.log(Level.INFO, "giveMeLinkFragments message was sent");
    }

    @Override
    public void onMessage(Message message) {
        try {
            String payload = message.getBody(String.class);
            LOGGER.log(Level.INFO, message.getStringProperty("eventName") + " message was received in links");
        } catch (JMSException ex) {
            LOGGER.log(Level.SEVERE, null, ex);
        }
    }
}

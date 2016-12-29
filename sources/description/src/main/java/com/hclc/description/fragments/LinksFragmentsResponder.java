package com.hclc.description.fragments;

import java.util.logging.Level;
import java.util.logging.Logger;
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
    @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'giveMeLinkFragments'")})
public class LinksFragmentsResponder implements MessageListener {

    private final static Logger LOGGER = Logger.getLogger(LinksFragmentsResponder.class.getName());

    @Resource(lookup = "java:jboss/exported/jms/topic/links")
    private Topic topic;

    @Inject
    JMSContext context;

    @Override
    public void onMessage(Message message) {
        try {
            String payload = message.getBody(String.class);
            context
                    .createProducer()
                    .setProperty("eventName", "thisIsMyLinkFragment")
                    .send(topic, "");
            LOGGER.log(Level.INFO, "thisIsMyLinkFragment message was sent from description service");
        } catch (JMSException ex) {
            LOGGER.log(Level.SEVERE, null, ex);
        }
    }
}

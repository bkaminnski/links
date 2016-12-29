package com.hclc.description.fragments;

import com.hclc.description.IncomingEventProcessor;
import static com.hclc.description.IncomingEventProcessor.processIncomingEvent;
import com.hclc.description.LinksTopic;
import com.hclc.description.ServiceLogger;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;

@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
    , 
    @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/links")
    ,
    @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'giveMeLinkFragments'")})
public class LinksFragmentsResponder implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    LinksTopic linksTopic;

    @Override
    public void onMessage(Message message) {
        try {
            processIncomingEvent(message, serviceLogger);
            linksTopic.sendEventWithPayloadAndLog("thisIsMyLinkFragment", "", serviceLogger);
        } catch (JMSException ex) {
            serviceLogger.severe(ex);
        }
    }
}

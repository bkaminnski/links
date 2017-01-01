package com.hclc.links.descriptions.slices;

import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
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
    @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'giveMeLinksSlices'")})
public class LinksSlicesResponder implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    LinksSlicesAnnouncer linksSlicesAnnouncer;

    @Override
    public void onMessage(Message message) {
        try {
            processIncomingEvent(message, serviceLogger);
            linksSlicesAnnouncer.announceLinksSlices();
        } catch (JMSException ex) {
            serviceLogger.severe(ex);
        }
    }
}

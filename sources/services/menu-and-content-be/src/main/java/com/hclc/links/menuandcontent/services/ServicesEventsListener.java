package com.hclc.links.menuandcontent.services;

import com.hclc.libs.monitoring.ServiceLogger;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;

import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;

@MessageDriven(activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
        , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/links")
        , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'giveMeServices'")
})
public class ServicesEventsListener implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    ServiceAnnouncer serviceAnnouncer;

    @Override
    public void onMessage(Message message) {
        try {
            processIncomingEvent(message, serviceLogger);
            serviceAnnouncer.announceServiceAvailability();
        } catch (JMSException ex) {
            serviceLogger.severe(ex);
        }
    }
}

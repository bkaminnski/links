package com.hclc.libs.availability;

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
        , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/backend")
        , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'giveMeServices'")
        , @ActivationConfigProperty(propertyName = "maxSession", propertyValue = "1")
})
public class AvailabilityEventsListener implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    AvailabilityAnnouncer availabilityAnnouncer;

    @Override
    public void onMessage(Message message) {
        try {
            processIncomingEvent(message, serviceLogger);
            availabilityAnnouncer.announceServiceAvailability();
        } catch (JMSException ex) {
            serviceLogger.severe(ex);
        }
    }
}

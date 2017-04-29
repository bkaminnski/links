package com.hclc.links.links.services;

import com.hclc.libs.events.IncomingEvent;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.annotation.PostConstruct;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;

import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.links.EventsNames.*;

@MessageDriven(activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
        , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/links")
        , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'myServiceIsAvailable' or eventName = 'myServiceIsUnavailable' or eventName = 'wakeUp'")
        , @ActivationConfigProperty(propertyName = "maxSession", propertyValue = "1")
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

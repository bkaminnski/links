package com.hclc.links.push.push.boundary;

import com.hclc.libs.events.IncomingEvent;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.Message;
import javax.jms.MessageListener;

import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;


@MessageDriven(activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
        , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/backend")
        , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'uiEvent'")
        , @ActivationConfigProperty(propertyName = "maxSession", propertyValue = "1")
})
public class UiEventsListener implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    PushEndpoint pushEndpoint;

    @Override
    public void onMessage(Message message) {
        try {
            IncomingEvent incomingEvent = processIncomingEvent(message, serviceLogger);
            pushEndpoint.notify(incomingEvent.getAuthenticatedUser(), incomingEvent.getPayload());
        } catch (Exception ex) {
            serviceLogger.severe(ex);
        }
    }
}

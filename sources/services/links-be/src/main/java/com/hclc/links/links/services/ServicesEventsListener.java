package com.hclc.links.links.services;

import com.hclc.libs.events.IncomingEvent;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.annotation.PostConstruct;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
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
    EventsListenerPoker poker;

    @Inject
    LinksTopic linksTopic;

    @Inject
    ServicesRegistry servicesRegistry;

    @PostConstruct
    public void iAmReadyToReceiveEvents() {
        generateNewTrackingId();
        poker.iWokeUpSoStopPoking();
        linksTopic.sendEventWithEmptyPayload(giveMeServices, serviceLogger);
    }

    @Override
    public void onMessage(Message message) {
        try {
            IncomingEvent incomingEvent = processIncomingEvent(message, serviceLogger);
            updateServicesRegister(incomingEvent);
        } catch (Exception e) {
            serviceLogger.severe(e);
        }
    }

    private void updateServicesRegister(IncomingEvent incomingEvent) {
        if (myServiceIsAvailable.equals(incomingEvent.getEventName())) {
            servicesRegistry.addUiUrlForService(uiUrl(incomingEvent), incomingEvent.getCreatingServiceName());
        } else if (myServiceIsUnavailable.equals(incomingEvent.getEventName())) {
            servicesRegistry.removeUiUrlForService(incomingEvent.getCreatingServiceName());
        }
    }

    private static String uiUrl(IncomingEvent incomingEvent) {
        return incomingEvent.getStringPropertyFromJsonPayload("uiUrl");
    }
}

package com.hclc.links.application.services;

import com.hclc.libs.events.BackendTopic;
import com.hclc.libs.events.IncomingEvent;
import com.hclc.libs.monitoring.ServiceLogger;
import com.hclc.links.application.EventsNames;

import javax.annotation.PostConstruct;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.Message;
import javax.jms.MessageListener;

import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.application.EventsNames.myServiceIsAvailable;
import static com.hclc.links.application.EventsNames.myServiceIsUnavailable;

@MessageDriven(activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
        , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/backend")
        , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'myServiceIsAvailable' or eventName = 'myServiceIsUnavailable' or eventName = 'wakeUp'")
        , @ActivationConfigProperty(propertyName = "maxSession", propertyValue = "1")
})
public class ServicesEventsListener implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    EventsListenerPoker poker;

    @Inject
    BackendTopic backendTopic;

    @Inject
    ServicesRegistry servicesRegistry;

    @PostConstruct
    public void iAmReadyToReceiveEvents() {
        generateNewTrackingId();
        poker.iWokeUpSoStopPoking();
        backendTopic.sendEventWithEmptyPayload(EventsNames.giveMeServices, serviceLogger);
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
            servicesRegistry.addService(incomingEvent.getCreatingServiceName(), priority(incomingEvent));
        } else if (myServiceIsUnavailable.equals(incomingEvent.getEventName())) {
            servicesRegistry.removeUrlForService(incomingEvent.getCreatingServiceName());
        }
    }

    private static Integer priority(IncomingEvent incomingEvent) {
        return incomingEvent.getIntegerPropertyFromJsonPayload("priority");
    }
}

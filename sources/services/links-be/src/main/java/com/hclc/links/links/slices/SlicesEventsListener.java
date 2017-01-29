package com.hclc.links.links.slices;

import com.hclc.libs.events.IncomingEvent;
import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.links.EventsNames.giveMeSlices;
import javax.annotation.PostConstruct;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.Message;
import javax.jms.MessageListener;
import static com.hclc.links.links.EventsNames.mySliceIsAvailable;
import static com.hclc.links.links.EventsNames.mySliceIsUnavailable;

@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
    , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/links")
    , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'mySliceIsAvailable' or eventName = 'mySliceIsUnavailable' or eventName = 'wakeUp'")
    , @ActivationConfigProperty(propertyName = "maxSession", propertyValue = "1")})
public class SlicesEventsListener implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    EventsListenerPoker poker;

    @Inject
    LinksTopic linksTopic;

    @Inject
    SlicesRegister slicesRegister;

    @PostConstruct
    public void iAmReadyToReceiveEvents() {
        generateNewTrackingId();
        poker.iWokeUpSoStopPoking();
        linksTopic.sendEventWithEmptyPayload(giveMeSlices, serviceLogger);
    }

    @Override
    public void onMessage(Message message) {
        try {
            IncomingEvent incomingEvent = processIncomingEvent(message, serviceLogger);
            updateSlicesRegister(incomingEvent);
        } catch (Exception e) {
            serviceLogger.severe(e);
        }
    }

    private void updateSlicesRegister(IncomingEvent incomingEvent) {
        if (mySliceIsAvailable.equals(incomingEvent.getEventName())) {
            slicesRegister.addUiUrlForService(uiUrl(incomingEvent), incomingEvent.getCreatingServiceName());
        } else if (mySliceIsUnavailable.equals(incomingEvent.getEventName())) {
            slicesRegister.removeUiUrlForService(incomingEvent.getCreatingServiceName());
        }
    }

    private static String uiUrl(IncomingEvent incomingEvent) {
        return incomingEvent.getStringPropertyFromJsonPayload("uiUrl");
    }
}

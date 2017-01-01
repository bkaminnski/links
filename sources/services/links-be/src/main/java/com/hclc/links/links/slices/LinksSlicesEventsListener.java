package com.hclc.links.links.slices;

import com.hclc.libs.events.IncomingEvent;
import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.links.EventsNames.giveMeLinksSlices;
import javax.annotation.PostConstruct;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.Message;
import javax.jms.MessageListener;
import static com.hclc.links.links.EventsNames.myLinksSliceIsAvailable;
import static com.hclc.links.links.EventsNames.myLinksSliceIsUnavailable;

@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
    , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/links")
    , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'myLinksSliceIsAvailable' or eventName = 'myLinksSliceIsUnavailable' or eventName = 'wakeUp'")
    , @ActivationConfigProperty(propertyName = "maxSession", propertyValue = "1")})
public class LinksSlicesEventsListener implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    EventsListenerPoker poker;

    @Inject
    LinksTopic linksTopic;

    @Inject
    LinksSlicesRegister linksSlicesRegister;

    @PostConstruct
    public void iAmReadyToReceiveEvents() {
        generateNewTrackingId();
        poker.iWokeUpSoStopPoking();
        linksTopic.sendEventWithEmptyPayload(giveMeLinksSlices, serviceLogger);
    }

    @Override
    public void onMessage(Message message) {
        try {
            IncomingEvent incomingEvent = processIncomingEvent(message, serviceLogger);
            updateLinksSlicesRegister(incomingEvent);
        } catch (Exception e) {
            serviceLogger.severe(e);
        }
    }

    private void updateLinksSlicesRegister(IncomingEvent incomingEvent) {
        if (myLinksSliceIsAvailable.equals(incomingEvent.getEventName())) {
            linksSlicesRegister.addUiUrlForService(uiUrl(incomingEvent), incomingEvent.getCreatingServiceName());
        } else if (myLinksSliceIsUnavailable.equals(incomingEvent.getEventName())) {
            linksSlicesRegister.removeUiUrlForService(incomingEvent.getCreatingServiceName());
        }
    }

    private static String uiUrl(IncomingEvent incomingEvent) {
        return incomingEvent.getStringPropertyFromJsonPayload("uiUrl");
    }
}

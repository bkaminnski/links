package com.hclc.links.links.slices;

import com.hclc.libs.events.IncomingEvent;
import com.hclc.libs.events.IncomingEventProcessor;
import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import static com.hclc.links.links.EventsNames.giveMeLinksSlices;
import static com.hclc.links.links.EventsNames.thisIsMyLinksSlice;
import javax.annotation.PostConstruct;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.Message;
import javax.jms.MessageListener;

@MessageDriven(activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
    , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/links")
    , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName = 'thisIsMyLinksSlice' or eventName = 'wakeUp'")
    , @ActivationConfigProperty(propertyName = "maxSession", propertyValue = "1")})
public class LinksSlicesFinder implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    FinderPoker finderPoker;

    @Inject
    LinksTopic linksTopic;

    @Inject
    LinksSlicesRegister linksSlicesRegister;

    @PostConstruct
    public void iAmReadyToReceiveLinksSlices() {
        generateNewTrackingId();
        finderPoker.iWokeUpSoStopPoking();
        linksTopic.sendEventWithEmptyPayload(giveMeLinksSlices, serviceLogger);
    }

    @Override
    public void onMessage(Message message) {
        try {
            IncomingEvent incomingEvent = processIncomingEvent(message, serviceLogger);
            if (thisIsMyLinksSlice.equals(incomingEvent.getEventName())) {
                storeUiUrlInSlicesRegister(incomingEvent);
            }
        } catch (Exception e) {
            serviceLogger.severe(e);
        }
    }

    private void storeUiUrlInSlicesRegister(IncomingEvent incomingEvent) {
        String uiUrl = incomingEvent.getStringPropertyFromJsonPayload("uiUrl");
        serviceLogger.info("uiUrl: " + uiUrl);
        linksSlicesRegister.storeUiUrlForService(uiUrl, incomingEvent.getCreatingServiceName());
    }
}

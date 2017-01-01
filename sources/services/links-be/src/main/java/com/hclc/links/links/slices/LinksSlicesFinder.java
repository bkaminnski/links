package com.hclc.links.links.slices;

import com.hclc.libs.events.IncomingEventProcessor;
import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import javax.annotation.PostConstruct;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSException;
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

    @PostConstruct
    public void iAmReadyToReceiveLinksSlices() {
        generateNewTrackingId();
        finderPoker.iWokeUpSoStopPoking();
        linksTopic.sendEventWithPayloadAndLog("giveMeLinksSlices", "", serviceLogger);
    }

    @Override
    public void onMessage(Message message) {
        try {
            IncomingEventProcessor.processIncomingEvent(message, serviceLogger);
        } catch (JMSException ex) {
            serviceLogger.severe(ex);
        }
    }
}

package com.hclc.links.monitoring.monitoring;

import com.hclc.libs.events.IncomingEvent;
import com.hclc.libs.events.BackendTopic;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.json.Json;
import javax.json.JsonObject;

import static com.hclc.libs.events.IncomingEventProcessor.processIncomingEvent;
import static com.hclc.links.monitoring.EventsNames.uiEvent;

@MessageDriven(activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Topic")
        , @ActivationConfigProperty(propertyName = "messageSelector", propertyValue = "eventName <> 'uiEvent'")
        , @ActivationConfigProperty(propertyName = "destination", propertyValue = "topic/backend")
})
public class ServicesEventsMonitor implements MessageListener {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    BackendTopic backendTopic;

    @Override
    public void onMessage(Message message) {
        try {
            IncomingEvent incomingEvent = processIncomingEvent(message, serviceLogger);
            pushToUi(incomingEvent);
        } catch (JMSException ex) {
            serviceLogger.severe(ex);
        }
    }

    private void pushToUi(IncomingEvent incomingEvent) {
        JsonObject monitoredEvent = Json
                .createObjectBuilder()
                .add("uiEventName", "uiEvent.topicMessage.available")
                .add("uiEventPayload", incomingEvent.toJson())
                .build();
        backendTopic.sendEventWithPayload(uiEvent, monitoredEvent.toString(), serviceLogger);
    }
}

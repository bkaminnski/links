package com.hclc.libs.events;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.identification.ServiceInfo;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Topic;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

public class BackendTopic {

    private static final String UI_EVENT = "uiEvent";

    @Resource(lookup = "java:jboss/exported/jms/topic/backend")
    private Topic topic;

    @Inject
    JMSContext context;

    @Inject
    ServiceInfo serviceInfo;

    public BackendEvent newBackendEvent(EventName eventName, AuthenticatedUser authenticatedUser, ServiceLogger serviceLogger) {
        return new BackendEvent(context, topic, serviceInfo, eventName, authenticatedUser, serviceLogger);
    }

    public UiEvent newUiEvent(AuthenticatedUser authenticatedUser, ServiceLogger serviceLogger) {
        return new UiEvent(new BackendEvent(context, topic, serviceInfo, new EventName(UI_EVENT), authenticatedUser, serviceLogger));
    }

    private static String formattedNowInUtc() {
        return ZonedDateTime.now(ZoneOffset.UTC).toString();
    }
}

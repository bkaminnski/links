package com.hclc.description.fragments;

import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

@Singleton
@Startup
public class LinksFragmentsAnnouncer {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    LinksTopic linksTopic;

    @PostConstruct
    public void announceLinkFragments() {
        generateNewTrackingId();
        linksTopic.sendEventWithPayloadAndLog("thisIsMyLinkFragment", "", serviceLogger);
    }
}

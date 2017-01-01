package com.hclc.links.descriptions.slices;

import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static com.hclc.libs.monitoring.TrackingIdHolder.generateNewTrackingId;
import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

@Singleton
@Startup
public class LinksSlicesAnnouncer {

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    LinksTopic linksTopic;

    @PostConstruct
    public void announceLinksSlicesOnStartup() {
        generateNewTrackingId();
        announceLinksSlices();
    }

    public void announceLinksSlices() {
        linksTopic.sendEventWithPayloadAndLog("thisIsMyLinksSlice", "", serviceLogger);
    }
}

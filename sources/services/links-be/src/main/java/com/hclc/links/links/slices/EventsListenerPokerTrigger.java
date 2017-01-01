package com.hclc.links.links.slices;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

@Startup
@Singleton
public class EventsListenerPokerTrigger {

    @Inject
    EventsListenerPoker eventsListenerPoker;

    @PostConstruct
    public void startPoking() {
        eventsListenerPoker.pokeUntilAwoken();
    }
}

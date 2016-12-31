package com.hclc.links.links.fragments;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

@Startup
@Singleton
public class FinderPokerTrigger {

    @Inject
    FinderPoker finderPoker;

    @PostConstruct
    public void startPoking() {
        finderPoker.pokeFinderUntilItWakesUp();
    }
}

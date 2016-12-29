package com.hclc.links.links.fragments;

import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import static java.lang.Thread.sleep;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.ejb.Asynchronous;
import javax.ejb.Lock;
import static javax.ejb.LockType.READ;
import javax.ejb.SessionContext;
import javax.ejb.Singleton;
import javax.ejb.TransactionAttribute;
import static javax.ejb.TransactionAttributeType.REQUIRES_NEW;
import javax.inject.Inject;

@Singleton
@Lock(READ)
public class FinderPoker {

    private final AtomicBoolean finderWokeUp = new AtomicBoolean(false);

    @Inject
    ServiceLogger serviceLogger;

    @Resource
    SessionContext sessionContext;

    @Inject
    LinksTopic linksTopic;

    @Asynchronous
    public void pokeFinderUntilItWakesUp() {
        serviceLogger.info("starting poking " + LinksFragmentsFinder.class.getName());
        try {
            while (!this.finderWokeUp.get()) {
                this.sessionContext.getBusinessObject(FinderPoker.class).pokeFinder();
                sleep(10);
            }
        } catch (InterruptedException ex) {
            Logger.getLogger(FinderPoker.class.getName()).log(Level.SEVERE, "poking thread was interrupted", ex);
        }
    }

    @TransactionAttribute(REQUIRES_NEW)
    public void pokeFinder() {
        linksTopic.sendEventWithPayloadAndLog("wakeUp", "", serviceLogger);
    }

    public void iWokeUpSoStopPoking() {
        boolean finderWasAwake = this.finderWokeUp.getAndSet(true);
        if (!finderWasAwake) {
            serviceLogger.info(LinksFragmentsFinder.class.getName() + " woke up, poking will now stop");
        }
    }
}

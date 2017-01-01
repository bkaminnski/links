package com.hclc.links.links.slices;

import com.hclc.libs.events.LinksTopic;
import com.hclc.libs.monitoring.ServiceLogger;
import com.hclc.links.links.EventsNames;
import static com.hclc.links.links.EventsNames.wakeUp;
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

    private static final String NAME_OF_CLASS_TO_WAKE_UP = LinksSlicesFinder.class.getName();

    private final AtomicBoolean finderWokeUp = new AtomicBoolean(false);

    @Inject
    ServiceLogger serviceLogger;

    @Resource
    SessionContext sessionContext;

    @Inject
    LinksTopic linksTopic;

    @Asynchronous
    public void pokeFinderUntilItWakesUp() {
        serviceLogger.info("starting poking " + NAME_OF_CLASS_TO_WAKE_UP);
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
        linksTopic.sendEventWithEmptyPayload(wakeUp, serviceLogger);
    }

    public void iWokeUpSoStopPoking() {
        boolean finderWasAwake = this.finderWokeUp.getAndSet(true);
        if (!finderWasAwake) {
            serviceLogger.info(NAME_OF_CLASS_TO_WAKE_UP + " woke up, poking will now stop");
        }
    }
}

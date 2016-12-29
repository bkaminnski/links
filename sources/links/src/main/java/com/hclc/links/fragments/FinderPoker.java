package com.hclc.links.fragments;

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
import javax.jms.JMSContext;
import javax.jms.Topic;

@Singleton
@Lock(READ)
public class FinderPoker {

    private final static Logger LOGGER = Logger.getLogger(FinderPoker.class.getName());

    private final AtomicBoolean finderWokeUp = new AtomicBoolean(false);

    @Resource
    SessionContext sessionContext;

    @Resource(lookup = "java:jboss/exported/jms/topic/links")
    private Topic topic;

    @Inject
    JMSContext context;

    @Asynchronous
    public void pokeFinderUntilItWakesUp() {
        LOGGER.info("starting poking LinksFragmentsFinder");
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
        context
                .createProducer()
                .setProperty("eventName", "wakeUp")
                .send(topic, "");
        LOGGER.log(Level.INFO, "wakeUp message was sent");
    }

    public void iWokeUpSoStopPoking() {
        boolean finderWasAwake = this.finderWokeUp.getAndSet(true);
        if (!finderWasAwake) {
            LOGGER.log(Level.INFO, "finder woke up, poking will now stop");
        }
    }
}

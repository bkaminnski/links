package com.hclc.links.application.services;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.events.BackendTopic;
import com.hclc.libs.monitoring.ServiceLogger;

import static com.hclc.libs.authentication.entity.AuthenticatedUser.SYSTEM_USER;
import static com.hclc.links.application.EventsNames.wakeUp;
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
public class EventsListenerPoker {

    private static final String NAME_OF_CLASS_TO_WAKE_UP = ServicesEventsListener.class.getName();

    private final AtomicBoolean eventsListenerIsAwake = new AtomicBoolean(false);

    @Inject
    ServiceLogger serviceLogger;

    @Resource
    SessionContext sessionContext;

    @Inject
    BackendTopic backendTopic;

    @Asynchronous
    public void pokeUntilAwoken() {
        serviceLogger.info("starting poking " + NAME_OF_CLASS_TO_WAKE_UP);
        try {
            while (!this.eventsListenerIsAwake.get()) {
                this.sessionContext.getBusinessObject(EventsListenerPoker.class).poke();
                sleep(10);
            }
        } catch (InterruptedException ex) {
            Logger.getLogger(EventsListenerPoker.class.getName()).log(Level.SEVERE, "poking thread was interrupted", ex);
        }
    }

    @TransactionAttribute(REQUIRES_NEW)
    public void poke() {
        backendTopic.newBackendEvent(wakeUp, SYSTEM_USER, serviceLogger).send();
    }

    public void iWokeUpSoStopPoking() {
        boolean eventsListenerWasAwake = this.eventsListenerIsAwake.getAndSet(true);
        if (!eventsListenerWasAwake) {
            serviceLogger.info(NAME_OF_CLASS_TO_WAKE_UP + " woke up, poking will now stop");
        }
    }
}

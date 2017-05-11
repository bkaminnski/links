package com.hclc.links.uniqueids.uniqueids.control;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.enterprise.concurrent.ManagedExecutorService;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.logging.Level;
import java.util.logging.Logger;

@Singleton
@Lock(LockType.READ)
@Startup
public class UniqueIdsGenerator {

    private final static int PORTION_SIZE = 100;

    private final static int MAX_QUEUE_SIZE = 10000;

    @Resource
    private ManagedExecutorService managedExecutorService;

    private final BlockingQueue<String> ids = new LinkedBlockingQueue<>(MAX_QUEUE_SIZE);

    private AtomicBoolean continueGeneration = new AtomicBoolean(true);

    private Future<?> generationFuture;

    public Collection<String> getNextPortion() throws InterruptedException {
        Collection<String> idsPortion = new ArrayList<>(PORTION_SIZE);
        for (int i = 0; i < PORTION_SIZE; i++) {
            idsPortion.add(ids.take());
        }
        return idsPortion;
    }


    @PostConstruct
    public void startGeneration() {
        generationFuture = managedExecutorService.submit(() -> generate());
    }

    @PreDestroy
    public void stopGenerating() {
        Logger.getLogger(UniqueIdsGenerator.class.getName()).log(Level.INFO, "generation will now stop");
        continueGeneration.set(false);
        generationFuture.cancel(true);
    }

    private void generate() {
        try {
            while (continueGeneration.get()) {
                ids.put(UUID.randomUUID().toString());
            }
        } catch (InterruptedException ex) {
            Logger.getLogger(UniqueIdsGenerator.class.getName()).log(Level.INFO, "generation of unique ids was interrupted", ex);
        }
        Logger.getLogger(UniqueIdsGenerator.class.getName()).log(Level.INFO, "generation of unique ids was stopped");
    }
}

package com.hclc.links.push.push.control;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

import static java.time.Instant.now;
import static java.time.temporal.ChronoUnit.MILLIS;
import static java.util.concurrent.TimeUnit.MILLISECONDS;

class Delayed<T> implements java.util.concurrent.Delayed {
    private final T wrappedObject;
    private final Instant validUntil;

    Delayed(T wrappedObject, long timeToKeepWrappedObject, ChronoUnit unit) {
        this.wrappedObject = wrappedObject;
        this.validUntil = now().plus(timeToKeepWrappedObject, unit);
    }

    public T getWrappedObject() {
        return wrappedObject;
    }

    @Override
    public long getDelay(TimeUnit unit) {
        return unit.convert(MILLIS.between(now(), validUntil), MILLISECONDS);
    }

    @Override
    public int compareTo(java.util.concurrent.Delayed other) {
        long currentDelay = this.getDelay(MILLISECONDS);
        long otherDelay = other.getDelay(MILLISECONDS);
        if (currentDelay > otherDelay)
            return 1;
        if (currentDelay < otherDelay)
            return -1;
        return 0;
    }
}

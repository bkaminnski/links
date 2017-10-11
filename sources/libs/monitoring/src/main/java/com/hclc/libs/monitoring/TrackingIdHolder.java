package com.hclc.libs.monitoring;

import java.util.UUID;

public class TrackingIdHolder {
    
    private static final ThreadLocal<String> trackingId = new ThreadLocal<>();

    public static void generateNewTrackingId() {
        trackingId.set(UUID.randomUUID().toString());
    }

    public static void set(String trackingId) {
        TrackingIdHolder.trackingId.set(trackingId);
    }

    public static String get() {
        return trackingId.get() == null ? "" : trackingId.get();
    }
}

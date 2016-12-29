package com.hclc.description;

import java.util.UUID;

public class TrackingIdHolder {

    private static final ThreadLocal<String> trackingId = new ThreadLocal<>();

    public static void generateNewTrackingId() {
        trackingId.set(UUID.randomUUID().toString());
    }

    public static void set(String trackingId) {
        TrackingIdHolder.trackingId.set(trackingId);
    }

    public static String getRaw() {
        return trackingId.get();
    }

    public static String getFormatted() {
        String formatted = trackingId.get();
        if (formatted == null || formatted.isEmpty()) {
            formatted = "[NONE]";
        } else if (formatted.length() > 8) {
            formatted = "[" + formatted.substring(0, 8) + "]";
        }
        return formatted;
    }
}

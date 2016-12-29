package com.hclc.libs.monitoring;

import com.hclc.libs.accessibility.ServiceInfo;
import static java.util.logging.Level.INFO;
import static java.util.logging.Level.SEVERE;
import java.util.logging.Logger;

public class ServiceLogger {

    private final Logger logger;
    private final ServiceInfo serviceInfo;

    public ServiceLogger(String loggerName, ServiceInfo serviceInfo) {
        this.logger = Logger.getLogger(loggerName);
        this.serviceInfo = serviceInfo;
    }

    public void info(String msg) {
        logger.log(INFO, prependedWithTrackingIdAndServiceName(msg));
    }

    public void severe(Throwable thrown) {
        logger.log(SEVERE, trackingIdAndserviceName(), thrown);
    }

    private String prependedWithTrackingIdAndServiceName(String msg) {
        return trackingIdAndserviceName() + " - " + msg;
    }

    private String trackingIdAndserviceName() {
        return formattedTrackingId() + " " + formattedServiceName();
    }

    public static String formattedTrackingId() {
        String formatted = TrackingIdHolder.get();
        if (formatted == null || formatted.isEmpty()) {
            formatted = "[NONE]";
        } else if (formatted.length() > 8) {
            formatted = "[" + formatted.substring(0, 8) + "]";
        }
        return formatted;
    }

    private String formattedServiceName() {
        return "[" + serviceInfo.serviceName() + "]";
    }
}

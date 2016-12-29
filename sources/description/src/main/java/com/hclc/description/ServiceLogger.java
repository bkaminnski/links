package com.hclc.description;

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
        logger.log(INFO, prependedWithPrefix(msg));
    }

    public void severe(Throwable thrown) {
        logger.log(SEVERE, null, thrown);
    }

    private String prependedWithPrefix(String msg) {
        return "[" + serviceInfo.serviceName() + "] " + TrackingIdHolder.getFormatted() + " - " + msg;
    }
}

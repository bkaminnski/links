package com.hclc.libs.accessibility;

public abstract class ServiceInfo {

    private static final String SERVICES_EXTERNAL_HOST = "services.external.host";
    private static final String SERVICES_EXTERNAL_PORT = "services.external.port";

    public abstract String serviceName();

    public String serviceExternalHost() {
        String externalHost = System.getProperty(SERVICES_EXTERNAL_HOST);
        if (systemPropertyIsEmpty(externalHost)) {
            return throwRuntimeExceptionWithExplanationMessage();
        }
        return externalHost;
    }

    public int serviceExternalPort() {
        String externalPort = System.getProperty(SERVICES_EXTERNAL_PORT);
        if (systemPropertyIsEmpty(externalPort)) {
            throwRuntimeExceptionWithExplanationMessage();
        }
        return Integer.valueOf(externalPort).intValue();
    }

    private boolean systemPropertyIsEmpty(String externalHost) {
        return externalHost == null || externalHost.trim().isEmpty();
    }

    private String throwRuntimeExceptionWithExplanationMessage() {
        throw new RuntimeException(SERVICES_EXTERNAL_HOST + " and " + SERVICES_EXTERNAL_PORT + " system properties have to be set to a valid host name and port accessible from outside");
    }

    public String url() {
        return "http://" + serviceExternalHost() + ":" + serviceExternalPort() + "/" + serviceName();
    }
}

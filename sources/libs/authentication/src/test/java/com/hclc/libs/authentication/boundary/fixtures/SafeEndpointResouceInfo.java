package com.hclc.libs.authentication.boundary.fixtures;

import javax.ws.rs.container.ResourceInfo;
import java.lang.reflect.Method;

public class SafeEndpointResouceInfo implements ResourceInfo {
    @Override
    public Method getResourceMethod() {
        try {
            return this.getClass().getMethod("safeEndpoint");
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Class<?> getResourceClass() {
        return null;
    }

    public void safeEndpoint() {

    }
}

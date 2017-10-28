package com.hclc.libs.authentication.boundary.fixtures;

import com.hclc.libs.authentication.entity.UnsafeEndpoint;

import javax.ws.rs.container.ResourceInfo;
import java.lang.reflect.Method;

public class UnsafeEndpointResouceInfo implements ResourceInfo {
    @Override
    public Method getResourceMethod() {
        try {
            return this.getClass().getMethod("unsafeEndpoint");
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Class<?> getResourceClass() {
        return null;
    }

    @UnsafeEndpoint
    public void unsafeEndpoint() {

    }
}

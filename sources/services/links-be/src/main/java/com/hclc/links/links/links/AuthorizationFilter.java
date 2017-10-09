package com.hclc.links.links.links;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class AuthorizationFilter implements ContainerRequestFilter {

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        Cookie sessionCookie = requestContext.getCookies().get("cuiSessionId");
        if (sessionCookie != null && "validId".equals(sessionCookie.getValue())) {
            return;
        }

        requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
    }
}

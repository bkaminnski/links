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
        String cuiSessionToken = requestContext.getHeaderString("CUI-Session-Token");
        System.out.println("cuiSessionToken = " + cuiSessionToken);

        requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
    }
}

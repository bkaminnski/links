package com.hclc.libs.authentication.entity;

import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

public class AuthenticatedUserSecurityContext implements SecurityContext {

    private final AuthenticatedUser authenticatedUser;
    private final String scheme;

    public AuthenticatedUserSecurityContext(AuthenticatedUser authenticatedUser, String scheme) {
        this.authenticatedUser = authenticatedUser;
        this.scheme = scheme;
    }

    @Override
    public Principal getUserPrincipal() {
        return authenticatedUser;
    }

    @Override
    public boolean isUserInRole(String role) {
        return false;
    }

    @Override
    public boolean isSecure() {
        return "https".equals(this.scheme);
    }

    @Override
    public String getAuthenticationScheme() {
        return scheme;
    }
}

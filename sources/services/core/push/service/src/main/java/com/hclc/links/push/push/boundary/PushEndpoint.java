package com.hclc.links.push.push.boundary;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.monitoring.ServiceLogger;
import com.hclc.links.push.push.control.Authenticated;
import com.hclc.links.push.push.control.Authentication;
import com.hclc.links.push.push.control.Candidates;

import javax.annotation.PostConstruct;
import javax.ejb.Lock;
import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.Optional;

import static javax.ejb.LockType.READ;

@Singleton
@Lock(READ)
@ServerEndpoint("/push")
public class PushEndpoint {

    private static final long MILLIS_TO_KEEP_CANDIDATE = 5000;
    private static final long MILLIS_TO_KEEP_AWAITING_NOTIFICATIONS = 5000;

    private Candidates candidates;
    private Authenticated authenticated;

    @Inject
    ServiceLogger serviceLogger;

    @Inject
    Authentication authentication;

    @PostConstruct
    public void postConstruct() {
        candidates = new Candidates(authentication, MILLIS_TO_KEEP_CANDIDATE);
        authenticated = new Authenticated(MILLIS_TO_KEEP_AWAITING_NOTIFICATIONS, serviceLogger);
    }

    @OnOpen
    public void onOpen(Session session) {
        candidates.add(session);
    }

    @OnClose
    public void onClose(Session session) {
        candidates.remove(session);
        authenticated.remove(session);
    }

    @OnMessage
    public void onMessage(String jwtToken, Session session) {
        Optional<AuthenticatedUser> authenticatedUser = candidates.authenticate(jwtToken, session);
        if (!authenticatedUser.isPresent()) {
            return;
        }
        authenticated.add(authenticatedUser.get(), session);
    }

    public void notify(AuthenticatedUser authenticatedUser, String notification) {
        authenticated.notify(authenticatedUser, notification);
    }
}

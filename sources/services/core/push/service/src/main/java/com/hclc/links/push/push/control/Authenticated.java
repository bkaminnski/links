package com.hclc.links.push.push.control;

import com.hclc.libs.authentication.entity.AuthenticatedUser;
import com.hclc.libs.monitoring.ServiceLogger;

import javax.websocket.Session;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

import static java.time.temporal.ChronoUnit.MILLIS;
import static java.util.concurrent.TimeUnit.MILLISECONDS;

public class Authenticated {

    private final ConcurrentHashMap<AuthenticatedUser, Set<Session>> authenticated = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<AuthenticatedUser, Delayed<List<String>>> awaitingNotifications = new ConcurrentHashMap<>();
    private final long millisToKeepAwaitingNotifications;
    private final ServiceLogger serviceLogger;

    public Authenticated(long millisToKeepAwaitingNotifications, ServiceLogger serviceLogger) {
        this.millisToKeepAwaitingNotifications = millisToKeepAwaitingNotifications;
        this.serviceLogger = serviceLogger;
    }

    public void add(AuthenticatedUser authenticatedUser, Session session) {
        addSessionToAuthenticatedUser(authenticatedUser, session);
        drainAndSendAwaitingNotifications(authenticatedUser);
    }

    private void addSessionToAuthenticatedUser(AuthenticatedUser authenticatedUser, Session session) {
        synchronized (authenticated) {
            Set<Session> sessionsSet = authenticated.computeIfAbsent(authenticatedUser, (k) -> new CopyOnWriteArraySet<>());
            sessionsSet.add(session);
        }
    }

    private void drainAndSendAwaitingNotifications(AuthenticatedUser authenticatedUser) {
        synchronized (awaitingNotifications) {
            drainAwaitingNotifications();
            sendAwaitingNotifications(authenticatedUser);
        }
    }

    private void drainAwaitingNotifications() {
        awaitingNotifications.entrySet().removeIf(e -> e.getValue().getDelay(MILLISECONDS) <= 0);
    }

    private void sendAwaitingNotifications(AuthenticatedUser authenticatedUser) {
        Delayed<List<String>> delayed = awaitingNotifications.remove(authenticatedUser);
        Set<Session> sessions = authenticated.get(authenticatedUser);
        if (delayed == null || sessions == null || sessions.isEmpty()) {
            return;
        }
        for (String notification : delayed.getWrappedObject()) {
            send(notification, sessions);
        }
    }

    public Optional<AuthenticatedUser> remove(Session sessionToRemove) {
        AuthenticatedUser authenticatedUserToRemove = null;
        synchronized (authenticated) {
            for (Map.Entry<AuthenticatedUser, Set<Session>> entry : authenticated.entrySet()) {
                if (entry.getValue().contains(sessionToRemove)) {
                    entry.getValue().remove(sessionToRemove);
                    authenticatedUserToRemove = entry.getKey();
                    break;
                }
            }
            if (authenticatedUserToRemove != null) {
                if (authenticated.get(authenticatedUserToRemove) != null && authenticated.get(authenticatedUserToRemove).isEmpty()) {
                    authenticated.remove(authenticatedUserToRemove);
                }
                return Optional.of(authenticatedUserToRemove);
            }
        }
        return Optional.empty();
    }

    public void notify(AuthenticatedUser authenticatedUser, String notification) {
        Set<Session> sessions = authenticated.get(authenticatedUser);
        if (sessions == null) {
            addToAwaitingNotifications(authenticatedUser, notification);
            return;
        }
        send(notification, sessions);
    }

    private void addToAwaitingNotifications(AuthenticatedUser authenticatedUser, String notification) {
        synchronized (awaitingNotifications) {
            Set<Session> sessionsRechecked = authenticated.get(authenticatedUser);
            if (sessionsRechecked != null) {
                send(notification, sessionsRechecked);
            } else {
                Delayed<List<String>> notifications = awaitingNotifications.computeIfAbsent(authenticatedUser, (k) -> new Delayed<>(Collections.synchronizedList(new LinkedList<>()), millisToKeepAwaitingNotifications, MILLIS));
                notifications.getWrappedObject().add(notification);
            }
        }
    }

    private void send(String notification, Set<Session> sessions) {
        try {
            for (Session session : sessions) {
                session.getBasicRemote().sendText(notification);
            }
        } catch (IOException e) {
            serviceLogger.severe(e);
        }
    }
}



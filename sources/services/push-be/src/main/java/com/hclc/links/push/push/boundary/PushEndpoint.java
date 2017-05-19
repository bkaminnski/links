package com.hclc.links.push.push.boundary;

import com.hclc.libs.monitoring.ServiceLogger;

import javax.ejb.Asynchronous;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.websocket.OnClose;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@Singleton
@Lock(LockType.READ)
@ServerEndpoint("/push")
@Asynchronous
public class PushEndpoint {

    @Inject
    ServiceLogger serviceLogger;

    private final Set<Session> sessions = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
    }

    public void notifyAllClients(String payload) {
        sessions.stream().forEach((session) -> {
            try {
                session.getBasicRemote().sendText(payload);
            } catch (IOException e) {
                serviceLogger.severe(e);
            }
        });
    }
}

package com.hclc.links.push.push.control;

import com.hclc.libs.authentication.entity.AuthenticatedUser;

import javax.websocket.Session;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Optional;
import java.util.concurrent.DelayQueue;

import static java.time.temporal.ChronoUnit.MILLIS;

public class Candidates {

    private final Authentication authentication;
    private final long millisToKeepCandidate;
    private final DelayQueue<Delayed<Session>> candidates = new DelayQueue<>();

    public Candidates(Authentication authentication, long millisToKeepCandidate) {
        this.authentication = authentication;
        this.millisToKeepCandidate = millisToKeepCandidate;
    }

    public void add(Session session) {
        drain();
        candidates.add(new Delayed(session, millisToKeepCandidate, MILLIS));
    }

    public Optional<Session> remove(Session session) {
        drain();
        Delayed<Session> toClose = null;
        for (Delayed<Session> candidate : candidates) {
            if (session.equals(candidate.getWrappedObject())) {
                toClose = candidate;
                break;
            }
        }
        if (toClose != null) {
            candidates.remove(toClose);
            return Optional.of(toClose.getWrappedObject());
        }
        return Optional.empty();
    }

    public Optional<AuthenticatedUser> authenticate(String jwtToken, Session session) {
        Optional<Session> candidate = remove(session);
        if (!candidate.isPresent()) {
            return Optional.empty();
        }
        try {
            return authentication.authenticate(jwtToken);
        } catch (IOException e) {
            return Optional.empty();
        }
    }

    private void drain() {
        candidates.drainTo(new LinkedList<>());
    }
}

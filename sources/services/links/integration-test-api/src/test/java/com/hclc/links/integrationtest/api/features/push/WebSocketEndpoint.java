package com.hclc.links.integrationtest.api.features.push;

import javax.websocket.Endpoint;
import javax.websocket.EndpointConfig;
import javax.websocket.Session;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class WebSocketEndpoint extends Endpoint {

    private final List<String> messages;
    private final CountDownLatch countDownLatch;
    private final long waitingTimeout;
    private final TimeUnit timeoutUnit;
    private Session session;

    public WebSocketEndpoint(int numberOfMessagesToWaitFor, long waitingTimeout, TimeUnit timeoutUnit) {
        this.messages = Collections.synchronizedList(new ArrayList<String>());
        this.countDownLatch = new CountDownLatch(numberOfMessagesToWaitFor);
        this.waitingTimeout = waitingTimeout;
        this.timeoutUnit = timeoutUnit;
    }

    @Override
    public void onOpen(Session session, EndpointConfig endpointConfig) {
        this.session = session;
        session.addMessageHandler(String.class, (message) -> {
            messages.add(message);
            countDownLatch.countDown();
        });
    }

    public boolean awaitAllMessages() throws InterruptedException {
        return countDownLatch.await(waitingTimeout, timeoutUnit);
    }

    public List<String> getMessages() {
        return messages;
    }

    public void send(String message) throws IOException {
        session.getBasicRemote().sendText(message);
    }
}

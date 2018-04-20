package com.hclc.links.integrationtest.api.tests;

import com.hclc.links.integrationtest.api.features.push.WebSocketEndpoint;
import com.hclc.links.integrationtest.api.stories.UserLogsInStory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.websocket.ContainerProvider;
import javax.websocket.DeploymentException;
import javax.websocket.WebSocketContainer;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static org.assertj.core.api.Assertions.assertThat;

public class PushTest {

    public static final String MESSAGE = "abc";
    public static final String EXPECTED_PUSH_MESSAGE = "{\"uiEventName\":\"uiEvent.push.echo\",\"uiEventPayload\":{\"value\":\"abc\"}}";
    public static final String ANOTHER_MESSAGE = "xyz";
    public static final String EXPECTED_ANOTHER_PUSH_MESSAGE = "{\"uiEventName\":\"uiEvent.push.echo\",\"uiEventPayload\":{\"value\":\"xyz\"}}";
    public static final String PUSH_WEB_SOCKET_ENDPOINT = "ws://localhost:8080/push/push";
    public static final String ECHO_ENDPOINT = "/push/resources/echo";
    private Client client;
    private WebTarget target;
    private WebSocketContainer webSocketContainer;
    private WebSocketEndpoint webSocketEndpoint;
    private WebSocketContainer anotherWebSocketContainer;
    private WebSocketEndpoint anotherWebSocketEndpoint;

    @BeforeEach
    public void before() {
        client = ClientBuilder.newClient();
        target = client.target("http://wildfly:8080");
        webSocketContainer = ContainerProvider.getWebSocketContainer();
        anotherWebSocketContainer = ContainerProvider.getWebSocketContainer();
    }

    @Test
    public void whenUserIsAuthenticated_pushMessageIsSentToWebSocket() throws URISyntaxException, IOException, DeploymentException, InterruptedException {
        String jwtToken = new UserLogsInStory(target).userLogsIntoTheSystem();

        webSocketEndpoint = new WebSocketEndpoint(1, 200, MILLISECONDS);
        webSocketContainer.connectToServer(webSocketEndpoint, new URI(PUSH_WEB_SOCKET_ENDPOINT));
        webSocketEndpoint.send(jwtToken);

        target.path(ECHO_ENDPOINT).queryParam("value", MESSAGE).request().header("CUI-Authentication-Token", jwtToken).get();

        webSocketEndpoint.awaitAllMessages();
        assertThat(webSocketEndpoint.getMessages()).describedAs("Web socket listener received its message").hasSize(1);
        assertThat(webSocketEndpoint.getMessages().get(0)).describedAs("Web socket listener received its message").isEqualTo(EXPECTED_PUSH_MESSAGE);
    }

    @Test
    public void whenUserIsNotAuthenticated_pushMessageIsNotSentToWebSocket() throws URISyntaxException, IOException, DeploymentException, InterruptedException {
        webSocketEndpoint = new WebSocketEndpoint(1, 1000, MILLISECONDS);
        webSocketContainer.connectToServer(webSocketEndpoint, new URI(PUSH_WEB_SOCKET_ENDPOINT));

        String jwtToken = new UserLogsInStory(target).userLogsIntoTheSystem();
        target.path(ECHO_ENDPOINT).queryParam("value", MESSAGE).request().header("CUI-Authentication-Token", jwtToken).get();

        boolean allMessagesReceivedWithinTimeout = webSocketEndpoint.awaitAllMessages();
        assertThat(allMessagesReceivedWithinTimeout).describedAs("Web socket listener never receives a message when user is not authenticated").isFalse();
    }

    @Test
    public void whenAMessageIsSentToSomeUser_noOtherUserMightReceiveThisMessage() throws InterruptedException, URISyntaxException, IOException, DeploymentException {
        String jwtToken = new UserLogsInStory(target).userLogsIntoTheSystem();
        webSocketEndpoint = new WebSocketEndpoint(2, 500, MILLISECONDS);
        webSocketContainer.connectToServer(webSocketEndpoint, new URI(PUSH_WEB_SOCKET_ENDPOINT));
        webSocketEndpoint.send(jwtToken);

        String anotherJwtToken = new UserLogsInStory(target).anotherUserLogsIntoTheSystem();
        anotherWebSocketEndpoint = new WebSocketEndpoint(2, 500, MILLISECONDS);
        anotherWebSocketContainer.connectToServer(anotherWebSocketEndpoint, new URI(PUSH_WEB_SOCKET_ENDPOINT));
        anotherWebSocketEndpoint.send(anotherJwtToken);

        target.path(ECHO_ENDPOINT).queryParam("value", MESSAGE).request().header("CUI-Authentication-Token", jwtToken).get();
        target.path(ECHO_ENDPOINT).queryParam("value", ANOTHER_MESSAGE).request().header("CUI-Authentication-Token", anotherJwtToken).get();

        boolean allMessagesReceivedWithinTimeout = webSocketEndpoint.awaitAllMessages();
        assertThat(allMessagesReceivedWithinTimeout).describedAs("Web socket listener never receives another message, therefore timeout is reached").isFalse();
        boolean allOtherMessagesReceivedWithinTimeout = anotherWebSocketEndpoint.awaitAllMessages();
        assertThat(allOtherMessagesReceivedWithinTimeout).describedAs("Another web socket listener never receives other message, therefore timeout is reached").isFalse();

        assertThat(webSocketEndpoint.getMessages()).describedAs("Web socket listener received only one (its) message").hasSize(1);
        assertThat(webSocketEndpoint.getMessages().get(0)).describedAs("Web socket listener received its message").isEqualTo(EXPECTED_PUSH_MESSAGE);
        assertThat(anotherWebSocketEndpoint.getMessages()).describedAs("Another web socket listener also received only one (its) message").hasSize(1);
        assertThat(anotherWebSocketEndpoint.getMessages().get(0)).describedAs("Another web socket listener received its message").isEqualTo(EXPECTED_ANOTHER_PUSH_MESSAGE);
    }

    @Test
    public void whenSomeMessageIsPushedBeforeWebSocketConnectionIsEstablished_pushMessageWaitsAndIsSentOnceWebSocketIsConnected() throws URISyntaxException, IOException, DeploymentException, InterruptedException {
        String jwtToken = new UserLogsInStory(target).yetAnotherUserLogsIntoTheSystem();
        target.path(ECHO_ENDPOINT).queryParam("value", MESSAGE).request().header("CUI-Authentication-Token", jwtToken).get();

        webSocketEndpoint = new WebSocketEndpoint(1, 200, MILLISECONDS);
        webSocketContainer.connectToServer(webSocketEndpoint, new URI(PUSH_WEB_SOCKET_ENDPOINT));
        webSocketEndpoint.send(jwtToken);
        webSocketEndpoint.awaitAllMessages();

        assertThat(webSocketEndpoint.getMessages()).describedAs("Web socket listener received its message even though it was connected after some time").hasSize(1);
        assertThat(webSocketEndpoint.getMessages().get(0)).describedAs("Web socket listener received its message even though it was connected after some time").isEqualTo(EXPECTED_PUSH_MESSAGE);
    }
}

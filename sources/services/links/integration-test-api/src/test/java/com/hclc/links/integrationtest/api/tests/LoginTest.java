package com.hclc.links.integrationtest.api.tests;

import com.hclc.links.integrationtest.api.stories.UserLogsInStory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

public class LoginTest {

    public static final String ROOT_ENDPOINT = "http://localhost:8080";
    private Client client;
    private WebTarget target;

    @BeforeEach
    public void before() {
        client = ClientBuilder.newClient();
        target = client.target(ROOT_ENDPOINT);
    }

    @Test
    public void userSuccessfullyLogsIntoTheSystem() {
        UserLogsInStory story = new UserLogsInStory(target);
        story.userLogsIntoTheSystem();
        story.assertUserSuccessfullyLoggedIn();
    }
}

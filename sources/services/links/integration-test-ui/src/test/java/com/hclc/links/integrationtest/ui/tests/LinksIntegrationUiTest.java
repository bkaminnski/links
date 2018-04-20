package com.hclc.links.integrationtest.ui.tests;

import com.hclc.links.integrationtest.ui.Application;
import com.hclc.links.integrationtest.ui.stories.UserLogsInStory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LinksIntegrationUiTest {

    private Application app;

    @BeforeEach
    public void before() {
        app = new Application();
    }

    @AfterEach
    public void after() {
        app.quit();
    }

    @Test
    public void userSuccessfullyLogsIntoTheSystem() {
        UserLogsInStory story = new UserLogsInStory(app);
        story.userLogsIntoTheSystem();
        story.assertUserSuccessfullyLoggedIn();
    }
}

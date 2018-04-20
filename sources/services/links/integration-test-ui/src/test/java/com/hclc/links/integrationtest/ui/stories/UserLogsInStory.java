package com.hclc.links.integrationtest.ui.stories;

import com.hclc.links.integrationtest.ui.Application;
import com.hclc.links.integrationtest.ui.pages.login.LoginForm;
import org.openqa.selenium.By;

import static org.assertj.core.api.Assertions.assertThatCode;

public class UserLogsInStory {

    private final Application app;

    public UserLogsInStory(Application app) {
        this.app = app;
    }

    public void userLogsIntoTheSystem() {
        new LoginForm(app)
                .fillEmail("bartosz.kaminski@zoho.com")
                .fillPassword("admin")
                .login();
    }

    public void assertUserSuccessfullyLoggedIn() {
        assertThatCode(() -> app.findElement(By.id("navbar")))
                .describedAs("User successfully logged in")
                .doesNotThrowAnyException();
    }
}

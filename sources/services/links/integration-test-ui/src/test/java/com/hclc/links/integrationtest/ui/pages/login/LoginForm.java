package com.hclc.links.integrationtest.ui.pages.login;

import com.hclc.links.integrationtest.ui.Application;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class LoginForm {

    private final WebElement loginForm;

    public LoginForm(Application app) {
        loginForm = app.findElement(By.id("login-form"));
    }

    public LoginForm fillEmail(String email) {
        loginForm.findElement(By.id("login-email-1-input")).sendKeys(email);
        return this;
    }

    public LoginForm fillPassword(String password) {
        loginForm.findElement(By.id("login-password-1-input")).sendKeys(password);
        return this;
    }

    public LoginForm login() {
        loginForm.findElement(By.id("login-button")).click();
        return this;
    }
}

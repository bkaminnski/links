package com.hclc.links.integrationtest.ui;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import static java.util.concurrent.TimeUnit.SECONDS;

public class Application {

    private static final String APPLICATION_URL = "http://wildfly:8080/application";
    private static final String APPLICATION_TITLE = "LinkLink";

    private final WebDriver driver;

    public Application() {
        this.driver = new FirefoxDriver();
        driver.manage().timeouts().implicitlyWait(60, SECONDS);
        waitForApplicationToStart();
    }

    private void waitForApplicationToStart() {
        boolean ready = false;
        int retries = 0;
        final int maxRetries = 120;
        while (!ready && retries < maxRetries) {
            try {
                lookForPageTitle();
                ready = true;
            } catch (Throwable e) {
                retries++;
                waitForOneSecond();
            }
        }
        if (retries == maxRetries) {
            throw new IllegalStateException("Application has not started within expected time");
        }
    }

    private void lookForPageTitle() {
        driver.get(APPLICATION_URL);
        if (!driver.getTitle().equals(APPLICATION_TITLE))
            throw new IllegalStateException("Page not yet loaded");
    }

    public void waitForOneSecond() {
        try {
            Thread.sleep(1000l);
        } catch (InterruptedException e1) {
        }
    }

    public void waitForTenSeconds() {
        try {
            Thread.sleep(10000l);
        } catch (InterruptedException e1) {
        }
    }

    public void quit() {
        driver.quit();
    }

    public WebElement findElement(By by) {
        return driver.findElement(by);
    }

    public void clickWithTimeout(WebElement webElement, int timeOutInSeconds) {
        try {
            long started = System.currentTimeMillis();
            while (System.currentTimeMillis() < started + timeOutInSeconds * 1000)
                try {
                    webElement.click();
                    return;
                } catch (ElementClickInterceptedException e) {
                    Thread.sleep(500);
                }
        } catch (InterruptedException e1) {
            // do nothing
        }
    }
}

package com.trackorganize.backend;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class SeleniumTest {

    private WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    void testAddTask() {

        // Open Trackorganize application
        driver.get("http://127.0.0.1:5173/add-task");

        // Enter task title
        driver.findElement(By.name("title"))
                .sendKeys("Selenium Test Task");

        // Enter description
        driver.findElement(By.name("description"))
                .sendKeys("Testing Trackorganize using Selenium.");

        // Select priority
        Select priority = new Select(
                driver.findElement(By.name("priority"))
        );
        priority.selectByVisibleText("High");

        // Enter due date
        driver.findElement(By.name("dueDate"))
                .sendKeys("12/31/2026");

        // Enter category
        driver.findElement(By.name("category"))
                .sendKeys("Testing");

        // Click Add Task button
        driver.findElement(
                By.cssSelector("button[type='submit']")
        ).click();

        // Verify success message
        String alertText = driver.switchTo().alert().getText();

        assertTrue(
                alertText.contains("Task added successfully"),
                "Success message was not displayed"
        );

        // Close alert
        driver.switchTo().alert().accept();

        // Verify navigation to Tasks page
        assertTrue(
                driver.getCurrentUrl().contains("/tasks"),
                "Application did not navigate to Tasks page"
        );
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
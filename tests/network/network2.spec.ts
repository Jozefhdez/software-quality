import { test, expect, type Page } from "@playwright/test";

test.describe("handling HTTP requests and fallbacks", () => {
  test("handle GET and POST requests", async ({ page }) => {
    await page.route("https://api.example.com/secure-data", async (route) => {
      if (route.request().method() === "GET") {
        // Mock a GET request response
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ message: "Mocked GET response" }),
        });
      } else {
        route.fallback(); // Let other methods go to the next handler
      }
    });

    await page.route("https://api.example.com/data", async (route) => {
      if (route.request().method() === "POST") {
        // Mock a post request response
        route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({ message: "Mocked POST response" }),
        });
      } else {
        route.fallback();
      }
    });

    // Fallback of other requests
    await page.route("**/*", async (route) => {
      route.fallback(); // Let all other requests continue normally
    });

    await page.goto("https://example.com");
  });
});

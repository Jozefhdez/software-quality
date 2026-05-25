import { test, expect, type Page } from "@playwright/test";

test.describe("Tarea 3", () => {
  test("abort request", async ({ page }) => {
    await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());

    await page.goto("https://playwright.dev");
    // expect(page.getByRole("img")).toHaveCount(0);

    await expect(
      page.getByRole("heading", { name: "Playwright enables reliable" }),
    ).toBeVisible();
  });
});

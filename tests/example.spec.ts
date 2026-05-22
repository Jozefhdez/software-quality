import { test, expect, firefox } from "@playwright/test";

test.describe("example describe block", () => {
  test("first", async ({ page }) => {
    await page.goto("https://github.com/");
    await expect(page).toHaveTitle(/GitHub/);
  });

  test("has title", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
});

test.describe("goto playwright test via google", () => {
  test("google", async ({ page }) => {
    await page.goto("https://google.com/");
    const searchBox = await page.getByRole("combobox", { name: "Buscar" });
    await searchBox.fill("playwright");
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("link", {
        name: "Playwright: Fast and reliable end-to-end testing for modern web apps",
      }),
    ).toBeVisible();

    await expect(page).toHaveTitle(/Playwright/);
  });
});

test.describe("goto github sign in test", () => {
  test("github", async ({ page }) => {
    await page.goto("https://github.com/");
    await page.getByRole("link", { name: "Sign in" }).click();

    await page
      .getByRole("textbox", { name: "Username or email address" })
      .fill("jozefexample@gmail.com");
    await page.getByRole("textbox", { name: "Password" }).fill("password123");

    await page.getByRole("button", { name: "Sign in" }).click();

    await expect(
      page.getByText("Incorrect username or password."),
    ).toBeVisible();
  });
});

test.describe("goto playwright test via google", () => {
  test("get started link", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Click the get started link.
    await page.getByRole("link", { name: "Get started" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole("heading", { name: "Installation" }),
    ).toBeVisible();
  });
});

test.describe("playwright context", () => {
  test("context test", async ({}) => {
    const browser = await firefox.launch();
    console.log("browser context ", browser.contexts().length);
    const page1 = await browser.newPage();
    await page1.goto("https://playwright.dev/");
    const page2 = await browser.newPage();
    await page2.goto("https://github.com/");
    console.log(
      "browser context ",
      browser.contexts().length,
      browser.contexts(),
    );
    await page1.screenshot({ path: "./tests/screenshot.png" });
    await browser.close();
  });

  test("pages methods", async ({}) => {
    const browser = await firefox.launch();
    const page = await browser.newPage();
    await page.goto("https://playwright.dev/");
    await page.screenshot({ path: "./tests/playwright.png" });
    await page.goto("https://github.com/");
    await page.screenshot({ path: "./tests/github.png" });

    console.log(
      page.once("load", () => {
        console.log("page loaded");
      }),
    );

    console.log(await page.url());
    await page.goBack();
    console.log(await page.url());
    await browser.close();
  });

  });
});

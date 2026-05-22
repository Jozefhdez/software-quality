import { test, expect, firefox } from "@playwright/test";

test.describe("mercado libre, test locators", () => {
  test("should find elements using all 7 recommended locators", async ({}) => {
    const browser = await firefox.launch();
    const page = await browser.newPage();
    await page.goto("https://www.mercadolibre.com.mx/");

    await expect(
      page.getByRole("combobox", { name: "Ingresa lo que quieras" }),
    ).toBeVisible();

    await expect(
      page.getByTestId("action:understood-button").first(),
    ).toBeVisible();

    await expect(
      page.getByAltText("Hasta 5% de cashback entuscompras"),
    ).toBeVisible();

    await expect(
      page.getByText("Las mejores plataformas de").first(),
    ).toBeVisible();

    await expect(
      page.getByLabel("Ingresa lo que quieras encontrar"),
    ).toBeVisible();

    await expect(
      page.getByPlaceholder("Buscar productos, marcas y más…"),
    ).toBeVisible();

    await expect(page.getByTitle("Carrito")).toBeVisible();
    await browser.close();
  });
});

test.describe("Todo playwright demo tests", () => {
  test("should add a new todo item", async ({ page }) => {
    test.slow();

    await page.goto("https://demo.playwright.dev/todomvc/#/");

    expect(await page.title()).toBe("React • TodoMVC");

    const input = page.getByRole("textbox", { name: "What needs to be done?" });
    await input.fill("Jozef");
    await input.press("Enter");

    const todoItem = page.getByTestId("todo-item");

    await expect.soft(todoItem.first()).toContainText("Jozef");

    await expect(todoItem).toHaveCount(1);
  });

  test("should mark task as completed", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    const input = page.getByRole("textbox", { name: "What needs to be done?" });
    await input.fill("Jozef");
    await input.press("Enter");

    const todoItem = page.getByTestId("todo-item");

    await expect(todoItem.first()).not.toHaveClass(/completed/);

    await todoItem
      .first()
      .getByRole("checkbox", { name: "Toggle Todo" })
      .check();

    await expect(todoItem.first()).toHaveClass(/completed/);
  });

  test("should delete a task", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    const input = page.getByRole("textbox", { name: "What needs to be done?" });
    await input.fill("Jozef");
    await input.press("Enter");

    const todoItem = page.getByTestId("todo-item");

    await todoItem.first().hover();
    await todoItem.first().getByRole("button", { name: "Delete" }).click();

    expect(await todoItem.count()).toBe(0);
    await expect(todoItem).not.toHaveCount(1);
  });

  test("should filter active todos", async ({ page }) => {
    // test.fixme(true, "skipped for now");

    await page.goto("https://demo.playwright.dev/todomvc/#/");
    const input = page.getByRole("textbox", { name: "What needs to be done?" });
    await input.fill("Jozef 1");
    await input.press("Enter");
    await input.fill("Jozef 2");
    await input.press("Enter");

    const items = page.getByTestId("todo-item");
    await items.last().getByRole("checkbox", { name: "Toggle Todo" }).check();

    await page.getByRole("link", { name: "Active" }).click();

    await expect(items).toHaveCount(1);
    await expect(items.first()).toContainText("Jozef 1");
  });

  test("should clear all completed todos", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    const input = page.getByRole("textbox", { name: "What needs to be done?" });
    await input.fill("Jozef 1");
    await input.press("Enter");
    await input.fill("Jozef 2");
    await input.press("Enter");

    const items = page.getByTestId("todo-item");

    await items.first().getByRole("checkbox", { name: "Toggle Todo" }).focus();
    await items.first().getByRole("checkbox", { name: "Toggle Todo" }).check();

    const clearButton = page.getByRole("button", { name: "Clear completed" });
    await clearButton.click();

    await expect(items).toHaveCount(1);

    await expect.soft(items.first()).toContainText("Jozef 2");

    await expect(items.first()).not.toContainText("Jozef 1");
  });
});

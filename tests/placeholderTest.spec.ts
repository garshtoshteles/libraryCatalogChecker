import { test, expect } from "@playwright/test";

test("Open Catalog", async ({ page }) => {
  await page.goto("https://rvalibrary.org/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home - Richmond Public Library/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});

// what will the test actually do? it will open a browser to the catalog. it will also grab the google sheet. let's start there.

import { test, expect } from "@playwright/test";

test("Add Records batch flow renders operational controls", async ({ page }) => {
  await page.goto("/records/new");
  await expect(page.getByRole("heading", { name: "Add Records" })).toBeVisible();
  await expect(page.getByText("Quick entry grid")).toBeVisible();
  await expect(page.getByRole("button", { name: /Add row/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Submit/ })).toBeVisible();
  await page.getByRole("button", { name: /Add row/ }).click();
  await expect(page.getByRole("button", { name: /Submit 2 records/ })).toBeVisible();
});

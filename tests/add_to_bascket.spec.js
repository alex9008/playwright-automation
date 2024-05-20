import { test } from "@playwright/test"

test.skip( "Add to bascket test", async ({ page }) => {

  await page.goto('http://localhost:2221/');
  await page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Remove from Basket' }).click();
});
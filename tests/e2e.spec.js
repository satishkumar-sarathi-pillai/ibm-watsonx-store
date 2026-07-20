import { test, expect } from '@playwright/test';

const uniqueEmail = `playwright-${Date.now()}@example.com`;

test('user can register, log in, browse products, and complete checkout', async ({ page }) => {
  await page.goto('/ibm-watsonx-store/login');
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();

  await page.getByRole('link', { name: /create account/i }).click();
  await page.locator('#firstName').fill('Playwright');
  await page.locator('#lastName').fill('User');
  await page.locator('#email').fill(uniqueEmail);
  await page.locator('#password').fill('TestPass123!');
  await page.locator('#confirm').fill('TestPass123!');
  await page.getByRole('button', { name: /create account/i }).click();

  await expect(page).toHaveURL(/\/login$/);

  await page.locator('#email').fill(uniqueEmail);
  await page.locator('#password').fill('TestPass123!');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/store$/);
  await expect(page.getByRole('heading', { name: /latest phones/i })).toBeVisible();

  await page.locator('a[href="/ibm-watsonx-store/product/iphone-15-pro"]').click();
  await page.getByRole('button', { name: /add to basket/i }).click();

  await page.getByRole('link', { name: /shopping basket/i }).click();

  await page.locator('input[name="fullName"]').fill('Playwright User');
  await page.locator('input[name="email"]').fill(uniqueEmail);
  await page.locator('input[name="address"]').fill('123 Test Street');
  await page.locator('input[name="postcode"]').fill('SW1A 1AA');
  await page.locator('input[name="card"]').fill('4242 4242 4242 4242');
  await page.getByRole('button', { name: /place order/i }).click();

  await expect(page.getByRole('heading', { name: /order confirmed/i })).toBeVisible();
});

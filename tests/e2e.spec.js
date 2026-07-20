import { test, expect } from '@playwright/test';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const uniqueEmail = `playwright-${Date.now()}@example.com`;

async function saveStepScreenshot(page, name) {
  const dir = path.resolve('test-results', 'artifacts');
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, `${name}.png`);
  const buffer = await page.screenshot();
  await writeFile(filePath, buffer);
  return filePath;
}

test('user can register, log in, browse products, and complete checkout', async ({ page }, testInfo) => {
  await page.goto('/ibm-watsonx-store/login');
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  const loginPath = await saveStepScreenshot(page, '01-login-screen');
  await testInfo.attach('01-login-screen', {
    path: loginPath
  });

  await page.getByRole('link', { name: /create account/i }).click();
  await page.locator('#firstName').fill('Playwright');
  await page.locator('#lastName').fill('User');
  await page.locator('#email').fill(uniqueEmail);
  await page.locator('#password').fill('TestPass123!');
  await page.locator('#confirm').fill('TestPass123!');
  await page.getByRole('button', { name: /create account/i }).click();

  await expect(page).toHaveURL(/\/login$/);
  const registrationPath = await saveStepScreenshot(page, '02-registration-complete');
  await testInfo.attach('02-registration-complete', {
    path: registrationPath
  });

  await page.locator('#email').fill(uniqueEmail);
  await page.locator('#password').fill('TestPass123!');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/\/store$/);
  await expect(page.getByRole('heading', { name: /latest phones/i })).toBeVisible();
  const storePath = await saveStepScreenshot(page, '03-storefront');
  await testInfo.attach('03-storefront', {
    path: storePath
  });

  await page.locator('a[href="/ibm-watsonx-store/product/iphone-15-pro"]').click();
  await page.getByRole('button', { name: /add to basket/i }).click();
  const productPath = await saveStepScreenshot(page, '04-product-added');
  await testInfo.attach('04-product-added', {
    path: productPath
  });

  await page.getByRole('link', { name: /shopping basket/i }).click();
  const basketPath = await saveStepScreenshot(page, '05-basket');
  await testInfo.attach('05-basket', {
    path: basketPath
  });

  await page.locator('input[name="fullName"]').fill('Playwright User');
  await page.locator('input[name="email"]').fill(uniqueEmail);
  await page.locator('input[name="address"]').fill('123 Test Street');
  await page.locator('input[name="postcode"]').fill('SW1A 1AA');
  await page.locator('input[name="card"]').fill('4242 4242 4242 4242');
  await page.getByRole('button', { name: /place order/i }).click();

  await expect(page.getByRole('heading', { name: /order confirmed/i })).toBeVisible();
  const confirmationPath = await saveStepScreenshot(page, '06-order-confirmed');
  await testInfo.attach('06-order-confirmed', {
    path: confirmationPath
  });

  await page.waitForTimeout(500);

  const userButton = page.getByRole('button', { name: /playwright/i });
  if (await userButton.isVisible().catch(() => false)) {
    await userButton.click();
    await page.getByRole('button', { name: /sign out/i }).click();
  } else {
    await page.getByRole('button', { name: /toggle menu/i }).click();
    await page.getByRole('button', { name: /sign out/i }).click();
  }
  await expect(page).toHaveURL(/\/login$/);
  const signoutPath = await saveStepScreenshot(page, '07-signout');
  await testInfo.attach('07-signout', {
    path: signoutPath
  });

  const videoPath = path.resolve('test-results', 'e2e-user-can-register-log--2532c-ducts-and-complete-checkout', 'video.webm');
  try {
    const videoStats = await stat(videoPath);
    if (videoStats.isFile()) {
      const videoHtml = `<!doctype html>
<html>
  <head><meta charset="utf-8" /></head>
  <body style="margin:0;font-family:Arial,sans-serif;background:#111;color:#fff;">
    <h3 style="margin:8px 0;">End-to-end video recording</h3>
    <video controls autoplay muted playsinline width="100%" style="max-width: 960px; border-radius: 8px;">
      <source src="/test-results/e2e-user-can-register-log--2532c-ducts-and-complete-checkout/video.webm" type="video/webm">
      Your browser does not support the video tag.
    </video>
    <p style="margin-top:8px;"><a href="/test-results/e2e-user-can-register-log--2532c-ducts-and-complete-checkout/video.webm" target="_blank" style="color:#7dd3fc;">Open video directly</a></p>
  </body>
</html>`;
      await testInfo.attach('e2e-video-player', {
        body: videoHtml,
        contentType: 'text/html'
      });
      await testInfo.attach('e2e-video', {
        path: videoPath,
        contentType: 'video/webm'
      });
    }
  } catch {
    // Ignore if the video file is not available yet for this environment.
  }
});

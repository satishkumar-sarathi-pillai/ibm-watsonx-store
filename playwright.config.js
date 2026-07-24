import { defineConfig } from '@playwright/test';

const runId = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);

export default defineConfig({
  testDir: './tests',
  outputDir: `test-results/${runId}`,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: `playwright-report/${runId}`, open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173/ibm-watsonx-store',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on'
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 180_000
  }
});

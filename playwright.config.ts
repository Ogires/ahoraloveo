import { defineConfig, devices } from '@playwright/test';

// Con BASE_URL las pruebas corren contra una web desplegada; sin ella, contra la compilada en local.
const remota = process.env.BASE_URL;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: remota ?? 'http://localhost:4321', trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: remota
    ? undefined
    : { command: 'npm run preview -- --port 4321', url: 'http://localhost:4321', reuseExistingServer: !process.env.CI },
});

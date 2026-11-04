import { expect, test } from '@playwright/test';
import { RUTAS } from './rutas';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const avisos: string[] = [];
    (window as unknown as { __csp: string[] }).__csp = avisos;
    document.addEventListener('securitypolicyviolation', (e) => avisos.push(`${e.violatedDirective} ${e.blockedURI}`));
  });
});

for (const ruta of RUTAS) {
  test(`${ruta} tiene CSP y no la incumple`, async ({ page }) => {
    await page.goto(ruta);
    await expect(page.locator('meta[http-equiv="content-security-policy" i]')).toHaveCount(1);
    if (ruta === '/buscar/') {
      // Pagefind compila WebAssembly al buscar: así se comprueba también 'wasm-unsafe-eval'.
      await page.locator('pagefind-input input').fill('crisis');
      await expect(page.locator('pagefind-results a').first()).toBeVisible({ timeout: 15_000 });
    }
    expect(await page.evaluate(() => (window as unknown as { __csp: string[] }).__csp)).toEqual([]);
  });
}

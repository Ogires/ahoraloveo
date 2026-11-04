import { expect, test } from '@playwright/test';
import { RUTAS } from './rutas';

// WCAG 1.4.10: a 320 px de ancho no hay scroll horizontal.
test.use({ viewport: { width: 320, height: 640 } });

for (const ruta of RUTAS) {
  test(`${ruta} cabe en 320 px sin scroll horizontal`, async ({ page }) => {
    await page.goto(ruta);
    const ancho = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(ancho).toBeLessThanOrEqual(320);
  });
}

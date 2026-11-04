import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { RUTAS } from './rutas';

const NORMAS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const esquema of ['light', 'dark'] as const) {
  for (const ruta of [...RUTAS, '/no-existe/']) {
    test(`${ruta} cumple WCAG 2.2 AA en modo ${esquema}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: esquema });
      await page.goto(ruta);
      const { violations } = await new AxeBuilder({ page }).withTags(NORMAS).analyze();
      expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  }
}

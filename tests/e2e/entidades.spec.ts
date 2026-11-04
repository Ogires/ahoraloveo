import { expect, test } from '@playwright/test';

// Cada apartado de una ficha enlaza la primera vez que nombra una entidad, para que se pueda leer
// suelto. En Camuflaje, AETAPI sale en tres apartados: cada uno tiene su enlace. Que dentro de un
// apartado solo se enlace la primera mención lo prueba tests/unit/enlazar.test.ts.
test('cada apartado enlaza su primera mención de una entidad', async ({ page }) => {
  await page.goto('/glosario/camuflaje/');
  for (const apartado of ['no-confundir', 'en-ninas', 'que-hacer']) {
    await expect(page.locator(`section[aria-labelledby="${apartado}"] a[href="https://aetapi.org/"]`)).toHaveCount(1);
  }
});

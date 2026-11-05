import { expect, test } from '@playwright/test';

test('la ficha de una herramienta muestra su carta de datos', async ({ page }) => {
  await page.goto('/diagnostico/m-chat-r-f/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('M-CHAT-R/F');
  for (const dato of ['Tipo', 'Edades', 'Quién la pasa', 'Formato', 'Duración']) {
    await expect(page.locator('.carta dt', { hasText: dato })).toHaveCount(1);
  }
  await expect(page.getByRole('heading', { name: 'En niñas' })).toBeVisible();
});

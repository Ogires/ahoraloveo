import { expect, test } from '@playwright/test';

test('el primer Tab lleva a «Saltar al contenido», y el enlace lleva al contenido', async ({ page }) => {
  await page.goto('/glosario/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#contenido')).toBeFocused();
});

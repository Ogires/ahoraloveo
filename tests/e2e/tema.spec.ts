import { expect, test } from '@playwright/test';

test('el botón pasa a modo oscuro y lo recuerda al recargar', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const boton = page.getByRole('button', { name: 'Modo oscuro' });
  await expect(boton).toHaveAttribute('aria-pressed', 'false');
  await boton.click();
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'oscuro');
  await expect(boton).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-tema', 'oscuro');
  await expect(page.getByRole('button', { name: 'Modo oscuro' })).toHaveAttribute('aria-pressed', 'true');
});

test('sin preferencia guardada sigue al sistema', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Modo oscuro' })).toHaveAttribute('aria-pressed', 'true');
  const fondo = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(fondo).toBe('rgb(26, 24, 39)'); // OSCURO.fondo, #1A1827
});

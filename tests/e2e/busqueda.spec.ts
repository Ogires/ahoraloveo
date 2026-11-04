import { expect, test } from '@playwright/test';

// La primera búsqueda descarga el índice y puede tardar más de 2 segundos: se espera al resultado.
const ESPERA = { timeout: 15_000 };

test('el nombre en español («crisis») encuentra la ficha en inglés', async ({ page }) => {
  await page.goto('/buscar/');
  await page.locator('pagefind-input input').fill('crisis');
  await expect(page.locator('pagefind-results a[href*="/glosario/meltdown/"]').first()).toBeVisible(ESPERA);
});

test('otro nombre en inglés también encuentra la ficha', async ({ page }) => {
  await page.goto('/buscar/');
  await page.locator('pagefind-input input').fill('camouflaging');
  await expect(page.locator('pagefind-results a[href*="/glosario/masking/"]').first()).toBeVisible(ESPERA);
});

test('sin resultados, lo dice en el tono de la web', async ({ page }) => {
  await page.goto('/buscar/');
  await page.locator('pagefind-input input').fill('zxqv');
  // El resumen visible. Pagefind repite el texto un momento en una región para lectores de pantalla,
  // así que getByText a veces encuentra dos elementos.
  await expect(page.locator('.pf-summary')).toContainText('No hemos encontrado nada para «zxqv»', ESPERA);
});

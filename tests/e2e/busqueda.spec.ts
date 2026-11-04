import { expect, test } from '@playwright/test';

// La primera búsqueda descarga el índice y puede tardar más de 2 segundos: se espera al resultado.
const ESPERA = { timeout: 15_000 };

test('buscar «crisis» encuentra su ficha', async ({ page }) => {
  await page.goto('/buscar/');
  await page.locator('pagefind-input input').fill('crisis');
  await expect(page.locator('pagefind-results a[href*="/glosario/crisis/"]').first()).toBeVisible(ESPERA);
});

test('un alias también encuentra la ficha', async ({ page }) => {
  await page.goto('/buscar/');
  await page.locator('pagefind-input input').fill('meltdown');
  await expect(page.locator('pagefind-results a[href*="/glosario/crisis/"]').first()).toBeVisible(ESPERA);
});

test('sin resultados, lo dice en el tono de la web', async ({ page }) => {
  await page.goto('/buscar/');
  await page.locator('pagefind-input input').fill('zxqv');
  // El resumen visible. Pagefind repite el texto un momento en una región para lectores de pantalla,
  // así que getByText a veces encuentra dos elementos.
  await expect(page.locator('.pf-summary')).toContainText('No hemos encontrado nada para «zxqv»', ESPERA);
});

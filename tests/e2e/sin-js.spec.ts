import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('el glosario se lee sin JavaScript', async ({ page }) => {
  await page.goto('/glosario/');
  await expect(page.getByRole('link', { name: 'Crisis' })).toBeVisible();
  // Sin JavaScript el botón no haría nada, así que no se muestra.
  await expect(page.getByRole('button', { name: 'Modo oscuro' })).toHaveCount(0);
});

test('la búsqueda explica que necesita JavaScript y ofrece el glosario', async ({ page }) => {
  await page.goto('/buscar/');
  // Con selector CSS: getByText y getByRole no miran dentro de <noscript>, aunque el navegador lo muestre.
  const aviso = page.locator('noscript p');
  await expect(aviso).toBeVisible();
  await expect(aviso).toContainText('La búsqueda necesita JavaScript');
  await expect(aviso.locator('a[href="/glosario/"]')).toBeVisible();
});

test('el proceso del diagnóstico se lee sin JavaScript', async ({ page }) => {
  await page.goto('/diagnostico/');
  await expect(page.locator('ol.pasos > li')).toHaveCount(6);
  await expect(page.getByRole('region', { name: 'Qué mide cada herramienta' })).toBeVisible();
});

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

test('las escenas se leen sin JavaScript, todas a la vez y cada una con su reverso desplegable', async ({ page }) => {
  await page.goto('/escenas/');
  await expect(page.locator('[data-tarjeta]:visible')).toHaveCount(await page.locator('[data-tarjeta]').count());
  // Sin JavaScript no se puede marcar ni pasar de una a otra: esos botones no se muestran.
  await expect(page.getByRole('button', { name: 'Esto lo hemos visto' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Siguiente' })).toHaveCount(0);
  await expect(page.getByRole('region', { name: 'Lo que habéis reconocido' })).toHaveCount(0);
  const tarjeta = page.locator('#escena-meltdown-1');
  await tarjeta.getByText('¿Qué hay detrás?').click();
  await expect(tarjeta.getByText('Detrás puede haber:')).toBeVisible();
});

test('las escenas de elegir de una ficha se abren sin JavaScript', async ({ page }) => {
  await page.goto('/glosario/shutdown/');
  const escena = page.locator('.elegir').first();
  await escena.getByText('Que no hace caso', { exact: true }).click();
  await expect(escena.locator('.explicacion').nth(1)).toBeVisible();
});

test('a quién acudir se lee completo sin JavaScript', async ({ page }) => {
  await page.goto('/a-quien-acudir/');
  await expect(page.getByRole('heading', { level: 1, name: 'A quién acudir' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'El camino público' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Asociaciones y fundaciones' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Para el resto de España' })).toBeVisible();
  await expect(page.locator('.organizacion').first()).toBeVisible();
});

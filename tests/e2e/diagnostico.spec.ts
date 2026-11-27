import { expect, test } from '@playwright/test';

test('la ficha de una herramienta muestra su carta de datos', async ({ page }) => {
  await page.goto('/diagnostico/m-chat-r-f/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('M-CHAT-R/F');
  for (const dato of ['Tipo', 'Edades', 'Quién la pasa', 'Formato', 'Duración']) {
    await expect(page.locator('.carta dt', { hasText: dato })).toHaveCount(1);
  }
  await expect(page.getByRole('heading', { name: 'En niñas' })).toBeVisible();
});

test('el proceso tiene seis pasos, en orden', async ({ page }) => {
  await page.goto('/diagnostico/');
  const pasos = page.locator('ol.pasos > li');
  await expect(pasos).toHaveCount(6);
  for (let i = 0; i < 6; i++) await expect(pasos.nth(i).locator('h2')).toHaveAttribute('id', `paso-${i + 1}`);
});

test('cada herramienta del proceso enlaza a una ficha que existe', async ({ page, request }) => {
  await page.goto('/diagnostico/');
  const enlaces = await page.locator('.herramientas-paso a').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
  expect(enlaces.length).toBeGreaterThan(0);
  for (const href of enlaces) expect((await request.get(href)).status()).toBe(200);
});

test('la tabla tiene encabezados de fila y de columna, y su recuadro se alcanza con el teclado', async ({ page }) => {
  await page.goto('/diagnostico/');
  const region = page.getByRole('region', { name: 'Qué mide cada herramienta' });
  await expect(region).toHaveAttribute('tabindex', '0');
  await expect(region.locator('thead th[scope="col"]')).toHaveCount(5);
  await expect(region.locator('tbody th[scope="row"]').first()).toBeVisible();
  await expect(region.locator('tbody th[scope="rowgroup"]').first()).toHaveText('Cribado');
});

test('explica con qué criterios se decide el diagnóstico, entre los pasos y la tabla', async ({ page }) => {
  await page.goto('/diagnostico/');
  const apartado = page.getByRole('region', { name: 'Los criterios: DSM-5 y CIE-11' });
  await expect(apartado.getByRole('heading', { level: 2 })).toBeVisible();
  await expect(apartado.locator('p').first()).not.toBeEmpty();
  await expect(apartado).toContainText('Qué podéis hacer');
  // Va después de los pasos y antes de la tabla, cuyas dos primeras columnas son sus dos bloques.
  const orden = await page.evaluate(() =>
    [...document.querySelectorAll('ol.pasos, #colegio, #criterios, #que-mide')].map((e) => e.id || e.className),
  );
  expect(orden).toEqual(['pasos', 'colegio', 'criterios', 'que-mide']);
});

test('explica lo que hace el colegio, con su recuadro de la Comunitat Valenciana', async ({ page }) => {
  await page.goto('/diagnostico/');
  const apartado = page.getByRole('region', { name: 'Lo que hace el colegio' });
  await expect(apartado.locator('p').first()).not.toBeEmpty();
  await expect(apartado).toContainText('Qué podéis hacer');
  const recuadro = apartado.getByRole('complementary', { name: 'En la Comunitat Valenciana' });
  await expect(recuadro.locator('p').first()).not.toBeEmpty();
  await expect(recuadro.locator('.comprobado')).toContainText('Comprobado el');
  // El primer paso lleva hasta aquí.
  await page.locator('#paso-1').locator('..').getByRole('link', { name: 'lo que hace el colegio' }).click();
  await expect(page).toHaveURL(/#colegio$/);
});

test('la pista de desplazamiento de la tabla se ve en móvil y se oculta en escritorio', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/diagnostico/');
  await expect(page.locator('.pista-desplazar')).toBeVisible();

  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(page.locator('.pista-desplazar')).toBeHidden();
});

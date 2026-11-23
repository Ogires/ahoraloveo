import { expect, test } from '@playwright/test';

test('el menú lleva a los programas', async ({ page }) => {
  await page.goto('/');
  const menu = page.getByRole('navigation', { name: 'Principal' });
  await menu.getByRole('link', { name: 'Programas', exact: true }).click();
  await expect(page).toHaveURL(/\/programas\/$/);
  await expect(menu.getByRole('link', { name: 'Programas', exact: true })).toHaveAttribute('aria-current', 'page');
});

test('la página de un programa muestra su carta de datos y sus apartados', async ({ page }) => {
  await page.goto('/programas/unstuck-and-on-target/');
  await expect(page.getByRole('heading', { level: 1 })).not.toBeEmpty();
  for (const dato of ['Para qué', 'Edades', 'Quién lo aplica', 'Formato', 'Duración', 'En España', 'Qué se sabe']) {
    await expect(page.locator('.carta dt', { hasText: dato })).toHaveCount(1);
  }
  for (const apartado of ['Qué es', 'Cómo es', 'Qué encontraron los estudios', 'En niñas', 'Limitaciones', 'Qué preguntar en consulta']) {
    await expect(page.getByRole('heading', { name: apartado, exact: true })).toBeVisible();
  }
  // La carta enlaza a la ficha del glosario a la que ayuda.
  await expect(page.locator('.carta a[href="/glosario/funciones-ejecutivas/"]')).toBeVisible();
});

test('la portada de los programas enlaza a cada uno, y cada enlace funciona', async ({ page, request }) => {
  await page.goto('/programas/');
  const enlaces = await page
    .locator('main a[href^="/programas/"]')
    .evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
  expect(enlaces.length).toBeGreaterThan(0);
  for (const href of enlaces) expect((await request.get(href)).status()).toBe(200);
});

test('la ficha muestra sus programas agrupados por edades, y una que no tiene no muestra el apartado', async ({ page }) => {
  await page.goto('/glosario/funciones-ejecutivas/');
  const apartado = page.getByRole('region', { name: 'Programas estudiados' });
  await expect(apartado.getByRole('heading', { level: 3 }).first()).toBeVisible();
  await expect(apartado.locator('a[href^="/programas/"]').first()).toBeVisible();
  await expect(apartado).toContainText('Que existan no quiere decir que haya que hacerlos');
  await page.goto('/glosario/alexitimia/');
  await expect(page.getByRole('region', { name: 'Programas estudiados' })).toHaveCount(0);
});

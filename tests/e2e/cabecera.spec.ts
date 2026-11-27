import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ENLACES_ESPERADOS = [
  'Glosario',
  'Escenas',
  'Diagnóstico',
  'Mitos',
  'Programas',
  'A quién acudir',
  'Buscar',
];

const NORMAS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('móvil (390×844)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('la cabecera cerrada mide 90 px como mucho, no solapa controles y oculta la lista', async ({ page }) => {
    await page.goto('/glosario/');
    const cabecera = page.locator('header.cabecera');
    const boxCabecera = await cabecera.boundingBox();
    expect(boxCabecera).not.toBeNull();
    expect(boxCabecera!.height).toBeLessThanOrEqual(90);

    const boxMarca = await page.locator('.marca').boundingBox();
    const boxTema = await page.locator('.selector-tema').boundingBox();
    const boxMenu = await page.locator('.nav-movil > summary').boundingBox();
    expect(boxMarca).not.toBeNull();
    expect(boxTema).not.toBeNull();
    expect(boxMenu).not.toBeNull();

    // Ningún control de la primera fila se solapa y hay aire suficiente para el contorno del foco.
    expect(boxTema!.x - (boxMarca!.x + boxMarca!.width)).toBeGreaterThanOrEqual(12);
    expect(boxMenu!.x - (boxTema!.x + boxTema!.width)).toBeGreaterThanOrEqual(12);

    await expect(page.locator('.nav-movil nav')).toBeHidden();
    await expect(page.locator('.nav-escritorio')).toBeHidden();
  });

  test('al pulsar «Menú» se ven los 7 enlaces en orden, son alcanzables con Tab y Escape cierra', async ({ page }) => {
    await page.goto('/escenas/');
    const resumen = page.locator('.nav-movil > summary');
    await resumen.click();

    const nav = page.getByRole('navigation', { name: 'Principal' });
    await expect(nav).toHaveCount(1);
    await expect(nav).toBeVisible();

    const enlaces = nav.getByRole('link');
    await expect(enlaces).toHaveText(ENLACES_ESPERADOS);
    await expect(nav.getByRole('link', { name: 'Escenas', exact: true })).toHaveAttribute('aria-current', 'page');

    // Desde el botón «Menú» se llega con Tab a cada enlace del menú desplegado.
    await resumen.focus();
    for (const texto of ENLACES_ESPERADOS) {
      await page.keyboard.press('Tab');
      await expect(nav.getByRole('link', { name: texto, exact: true })).toBeFocused();
    }

    await page.keyboard.press('Escape');
    await expect(nav).toBeHidden();
    await expect(resumen).toBeFocused();
  });

  for (const esquema of ['light', 'dark'] as const) {
    test(`cumple WCAG 2.2 AA en 390 px con menú cerrado y abierto (${esquema})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: esquema });
      await page.goto('/');
      const cerrado = await new AxeBuilder({ page }).withTags(NORMAS).analyze();
      expect(cerrado.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);

      await page.locator('.nav-movil > summary').click();
      const abierto = await new AxeBuilder({ page }).withTags(NORMAS).analyze();
      expect(abierto.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  }
});

test('a 320×640 (zoom 400 % en 1280 px) sale el menú móvil y cabe sin desbordar', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  await expect(page.locator('.nav-movil > summary')).toBeVisible();
  await expect(page.locator('.nav-escritorio')).toBeHidden();
  const ancho = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(ancho).toBeLessThanOrEqual(320);
});

for (const ancho of [1024, 1200, 1440]) {
  for (const esquema of ['light', 'dark'] as const) {
    test(`en escritorio (${ancho} px, ${esquema}) toda la cabecera va en una fila`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: esquema });
      await page.setViewportSize({ width: ancho, height: 900 });
      await page.goto('/a-quien-acudir/');

      await expect(page.locator('.nav-movil > summary')).toBeHidden();
      const nav = page.getByRole('navigation', { name: 'Principal' });
      await expect(nav).toHaveCount(1);
      await expect(nav).toBeVisible();
      await expect(nav.getByRole('link')).toHaveText(ENLACES_ESPERADOS);

      const boxMarca = await page.locator('.marca').boundingBox();
      const boxPrimero = await nav.getByRole('link').first().boundingBox();
      const boxUltimo = await nav.getByRole('link').last().boundingBox();
      const boxTema = await page.locator('.selector-tema').boundingBox();
      expect(boxMarca).not.toBeNull();
      expect(boxPrimero).not.toBeNull();
      expect(boxUltimo).not.toBeNull();
      expect(boxTema).not.toBeNull();

      expect(Math.abs(boxTema!.y - boxPrimero!.y)).toBeLessThan(20);
      expect(Math.abs(boxPrimero!.y - boxUltimo!.y)).toBeLessThan(20);
      expect(Math.abs(boxTema!.y - boxMarca!.y)).toBeLessThan(20);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(ancho);
    });
  }
}

test('el pie lleva el enlace a «Sobre esta web»', async ({ page }) => {
  await page.goto('/');
  const pie = page.getByRole('contentinfo');
  const sobre = pie.getByRole('link', { name: 'Sobre esta web', exact: true });
  await expect(sobre).toBeVisible();
  await expect(sobre).toHaveAttribute('href', '/sobre/');
});

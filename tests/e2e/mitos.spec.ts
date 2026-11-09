import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { parse } from 'yaml';

// Los textos salen del YAML: así la prueba no se rompe cada vez que se pule la redacción.
const leer = (id: string) => {
  const m = parse(readFileSync(join(process.cwd(), 'src/content/mitos', `${id}.yaml`), 'utf8'));
  return { ...m, mito: m.mito.trim(), dato: m.dato.trim() };
};

test('la portada de los mitos pone cada mito entre comillas, con su dato debajo', async ({ page }) => {
  const mito = leer('memoria-prodigiosa');
  await page.goto('/mitos/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mitos sobre el autismo');
  const fila = page.locator('.mito').filter({ hasText: mito.mito });
  await expect(fila.getByRole('link')).toHaveText(`«${mito.mito}»`);
  await expect(fila.getByRole('link')).toHaveAttribute('href', '/mitos/memoria-prodigiosa/');
  await expect(fila.locator('.dato')).toHaveText(mito.dato);
});

test('los mitos salen en el orden de su campo «orden»', async ({ page }) => {
  const mitos = ['memoria-prodigiosa', 'ninas-calladas'].map(leer).sort((a, b) => a.orden - b.orden);
  await page.goto('/mitos/');
  await expect(page.locator('.mito a')).toHaveText(mitos.map((m) => `«${m.mito}»`));
});

test('la página de un mito empieza por el mito y pone el dato justo debajo', async ({ page }) => {
  const mito = leer('memoria-prodigiosa');
  await page.goto('/mitos/memoria-prodigiosa/');
  await expect(page.locator('.se-suele-oir')).toHaveText('Se suele oír');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(`«${mito.mito}»`);
  await expect(page.locator('header .dato')).toHaveText(mito.dato);
  // El dato es la descripción: lo que se ve debajo del título al compartir el enlace.
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', mito.dato);
  for (const apartado of ['Por qué no es así', 'Qué podéis hacer', 'Fuentes']) {
    await expect(page.getByRole('heading', { level: 2, name: apartado })).toBeVisible();
  }
});

test('una ficha del glosario enlaza a los mitos que hablan de ella', async ({ page }) => {
  const mito = leer('ninas-calladas');
  expect(mito.relacionados).toContain('masking');
  await page.goto('/glosario/masking/');
  const apartado = page.locator('section[aria-labelledby="mitos"]');
  await expect(apartado.getByRole('heading', { name: 'Mitos sobre esto' })).toBeVisible();
  await expect(apartado.getByRole('link', { name: `«${mito.mito}»` })).toHaveAttribute('href', '/mitos/ninas-calladas/');
});

test('el menú y la portada llevan a los mitos', async ({ page }) => {
  await page.goto('/');
  const portada = page.getByRole('main').getByRole('link', { name: 'Mitos sobre el autismo', exact: true });
  await expect(portada).toHaveAttribute('href', '/mitos/');
  const menu = page.getByRole('navigation', { name: 'Principal' });
  await menu.getByRole('link', { name: 'Mitos', exact: true }).click();
  await expect(page).toHaveURL(/\/mitos\/$/);
  await expect(menu.getByRole('link', { name: 'Mitos', exact: true })).toHaveAttribute('aria-current', 'page');
});

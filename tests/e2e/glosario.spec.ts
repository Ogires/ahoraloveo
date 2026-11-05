import { expect, test } from '@playwright/test';

// El título de cada ficha es el nombre que más se usa en español al hablar de autismo. A veces es
// inglés («Meltdown»): entonces va marcado como inglés, para que el lector de pantalla lo pronuncie
// bien, y debajo está el español. Si es español («Alexitimia»), debajo va el original en inglés,
// que es con el que se busca la literatura.
test('una ficha con título en inglés lleva debajo su nombre en español', async ({ page }) => {
  await page.goto('/glosario/meltdown/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Meltdown');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAttribute('lang', 'en');
  await expect(page.locator('.otro-nombre')).toHaveText('En español: crisis, crisis por sobrecarga');
});

test('una ficha con título en español lleva debajo el original en inglés', async ({ page }) => {
  await page.goto('/glosario/alexitimia/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Alexitimia');
  await expect(page.getByRole('heading', { level: 1 })).not.toHaveAttribute('lang', 'en');
  await expect(page.locator('.otro-nombre')).toHaveText('En inglés: alexithymia');
  await expect(page.locator('.otro-nombre span')).toHaveAttribute('lang', 'en');
});

test('el índice del glosario muestra cada término con su otro nombre', async ({ page }) => {
  await page.goto('/glosario/');
  await expect(page.getByRole('link', { name: 'Meltdown (crisis)' })).toHaveAttribute('href', '/glosario/meltdown/');
  await expect(page.getByRole('link', { name: 'Alexitimia (alexithymia)' })).toHaveAttribute('href', '/glosario/alexitimia/');
});

test('el selector marca la vista en la que estás', async ({ page }) => {
  await page.goto('/glosario/');
  const vistas = page.getByRole('navigation', { name: 'Orden del glosario' });
  await expect(vistas.getByRole('link', { name: 'Por familias' })).toHaveAttribute('aria-current', 'page');
  await vistas.getByRole('link', { name: 'De la A a la Z' }).click();
  await expect(page).toHaveURL(/\/glosario\/a-z\/$/);
  await expect(vistas.getByRole('link', { name: 'De la A a la Z' })).toHaveAttribute('aria-current', 'page');
});

test('la vista de la A a la Z agrupa por letra, en orden, con la familia de cada término', async ({ page }) => {
  await page.goto('/glosario/a-z/');
  const letras = await page.locator('h2.letra').allTextContents();
  expect(letras.length).toBeGreaterThan(1);
  expect([...letras].sort((a, b) => a.localeCompare(b, 'es'))).toEqual(letras);
  const primera = page.locator('.entrada').first();
  await expect(primera.getByRole('link')).toHaveText('Alexitimia (alexithymia)');
  await expect(primera.locator('.chip')).toHaveText('Emociones');
});

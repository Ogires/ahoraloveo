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

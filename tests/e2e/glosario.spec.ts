import { expect, test } from '@playwright/test';

// El título de cada ficha es el original en inglés, que es como aparece en los libros y los
// estudios. Va marcado como inglés para que el lector de pantalla lo pronuncie bien, y justo
// debajo está el nombre en español, que es el que la familia puede haber oído en la consulta.
test('la ficha lleva el título en inglés y debajo su nombre en español', async ({ page }) => {
  await page.goto('/glosario/meltdown/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Meltdown');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAttribute('lang', 'en');
  await expect(page.locator('.en-espanol')).toHaveText('En español: crisis, crisis por sobrecarga');
});

test('el índice del glosario muestra cada término con su nombre en español', async ({ page }) => {
  await page.goto('/glosario/');
  await expect(page.getByRole('link', { name: 'Meltdown (crisis)' })).toHaveAttribute('href', '/glosario/meltdown/');
});

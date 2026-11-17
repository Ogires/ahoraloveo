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

// Solo los otros nombres en inglés van marcados como inglés: los demás se leen en español.
test('en «También se dice», solo los nombres en inglés van con lang="en"', async ({ page }) => {
  await page.goto('/glosario/ecolalia/');
  await expect(page.locator('.alias')).toHaveText('También se dice: ecolalia inmediata, ecolalia demorada, scripting');
  await expect(page.locator('.alias [lang="en"]')).toHaveText(['scripting']);
});

test('un texto puede enlazar a otra página de la web', async ({ page }) => {
  await page.goto('/glosario/neurodiversidad/');
  await expect(page.getByRole('link', { name: 'la ficha del masking' })).toHaveAttribute('href', '/glosario/masking/');
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

test('las escenas aparecen en «En el día a día», con su edad y su lugar', async ({ page }) => {
  await page.goto('/glosario/ecolalia/');
  const apartado = page.locator('section[aria-labelledby="dia-a-dia"]');
  await expect(apartado.getByRole('heading', { name: 'En el día a día' })).toBeVisible();
  await expect(apartado.locator('.escena')).toHaveCount(2);
  await expect(apartado.locator('.edad-lugar').first()).toHaveText('4 años · en la consulta de pediatría');
});

test('las escenas con ilustración la muestran, con el texto alternativo vacío a propósito', async ({ page }) => {
  await page.goto('/glosario/estereotipias/');
  const imagenes = page.locator('.escena img');
  expect(await imagenes.count()).toBeGreaterThan(0);
  for (const imagen of await imagenes.all()) {
    // Vacío porque la imagen no cuenta nada que no diga el texto de al lado (guía de escenas).
    await expect(imagen).toHaveAttribute('alt', '');
    await imagen.scrollIntoViewIfNeeded();
    await expect.poll(() => imagen.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBe(true);
  }
});

test('las escenas de elegir van debajo de «No confundir con», con «No lo sé» al final', async ({ page }) => {
  await page.goto('/glosario/meltdown/');
  const apartado = page.locator('section[aria-labelledby="no-confundir"]');
  const escenas = apartado.locator('.elegir');
  await expect(escenas).toHaveCount(2);
  const primera = escenas.first();
  await expect(primera.getByRole('heading', { level: 3 })).toHaveText('¿Crisis o rabieta?');
  await expect(primera.locator('summary').last()).toHaveText('No lo sé');
});

test('al elegir una opción se ve su explicación, y al elegir otra se cierra la anterior', async ({ page }) => {
  await page.goto('/glosario/meltdown/');
  const escena = page.locator('.elegir').first();
  const opciones = escena.locator('details');
  await escena.getByText('Una rabieta', { exact: true }).click();
  await expect(opciones.nth(1).locator('.explicacion')).toBeVisible();
  await expect(opciones.nth(1).locator('.explicacion')).toContainText('encaja mejor con una crisis');
  await escena.getByText('No lo sé', { exact: true }).click();
  await expect(opciones.nth(2).locator('.explicacion')).toBeVisible();
  await expect(opciones.nth(1).locator('.explicacion')).toBeHidden();
});

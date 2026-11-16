import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { ORDEN_ESCENAS } from '../../src/lib/tarjetas';

const TOTAL = ORDEN_ESCENAS.length;
const progreso = (page: import('@playwright/test').Page) => page.locator('[data-progreso]');

test('se ve una escena cada vez, con el progreso, y el foco pasa al título de la siguiente', async ({ page }) => {
  await page.goto('/escenas/');
  await expect(page.locator('[data-tarjeta]:visible')).toHaveCount(1);
  await expect(progreso(page)).toHaveText(`Escena 1 de ${TOTAL} · Habéis marcado 0`);
  await expect(page.getByRole('button', { name: 'Anterior' })).toBeDisabled();

  await page.getByRole('button', { name: 'Siguiente' }).click();
  await expect(progreso(page)).toHaveText(`Escena 2 de ${TOTAL} · Habéis marcado 0`);
  await expect(page.locator('[data-tarjeta]:visible')).toHaveCount(1);
  await expect(page.locator(`#escena-${ORDEN_ESCENAS[1]} h2`)).toBeFocused();
  await expect(page).toHaveURL(new RegExp(`#escena-${ORDEN_ESCENAS[1]}$`));
});

test('un enlace a una escena abre esa tarjeta, y en la última no se puede seguir', async ({ page }) => {
  const ultima = ORDEN_ESCENAS[TOTAL - 1];
  await page.goto(`/escenas/#escena-${ultima}`);
  await expect(page.locator(`#escena-${ultima}`)).toBeVisible();
  await expect(progreso(page)).toHaveText(`Escena ${TOTAL} de ${TOTAL} · Habéis marcado 0`);
  await expect(page.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
});

test('al girar la tarjeta se ve lo que puede haber detrás, y el foco pasa al término', async ({ page }) => {
  await page.goto('/escenas/#escena-meltdown-1');
  const tarjeta = page.locator('#escena-meltdown-1');
  await expect(tarjeta.getByText('Detrás puede haber:')).toBeHidden();
  await tarjeta.getByText('¿Qué hay detrás?').click();
  await expect(tarjeta.getByText('Detrás puede haber:')).toBeVisible();
  await expect(tarjeta.locator('[data-nombre]')).toBeFocused();
  await expect(tarjeta.locator('[data-nombre]')).toHaveText('Meltdown (crisis)');
  await expect(tarjeta.locator('.chip')).toHaveText('Emociones');
  await expect(tarjeta.getByRole('link', { name: 'Leer la ficha de Meltdown' })).toHaveAttribute('href', '/glosario/meltdown/');
});

test('lo marcado se guarda, sale en «Lo que habéis reconocido» y se puede borrar', async ({ page }) => {
  await page.goto('/escenas/#escena-meltdown-1');
  const reconocido = page.getByRole('region', { name: 'Lo que habéis reconocido' });
  await expect(reconocido.getByText('Todavía no habéis marcado ninguna escena.')).toBeVisible();
  await expect(reconocido.getByText('se guarda solo en este navegador')).toBeVisible();

  const marcar = page.locator('#escena-meltdown-1').getByRole('button', { name: 'Esto lo hemos visto' });
  await marcar.click();
  await expect(marcar).toHaveAttribute('aria-pressed', 'true');
  await expect(progreso(page)).toContainText('Habéis marcado 1');
  await expect(reconocido.getByRole('link', { name: 'Meltdown (crisis)' })).toHaveAttribute('href', '/glosario/meltdown/');

  await page.reload();
  await expect(progreso(page)).toContainText('Habéis marcado 1');
  await expect(marcar).toHaveAttribute('aria-pressed', 'true');

  await reconocido.getByRole('button', { name: 'Borrar lo marcado' }).click();
  await expect(progreso(page)).toContainText('Habéis marcado 0');
  await expect(reconocido.getByRole('link')).toHaveCount(0);
  await expect(reconocido.getByRole('heading', { name: 'Lo que habéis reconocido' })).toBeFocused();
  expect(await page.evaluate(() => localStorage.getItem('escenas-marcadas'))).toBeNull();
});

test('dos escenas del mismo término lo ponen una sola vez en la lista', async ({ page }) => {
  await page.goto('/escenas/#escena-meltdown-1');
  await page.locator('#escena-meltdown-1').getByRole('button', { name: 'Esto lo hemos visto' }).click();
  await page.goto('/escenas/#escena-meltdown-2');
  await page.locator('#escena-meltdown-2').getByRole('button', { name: 'Esto lo hemos visto' }).click();
  await expect(progreso(page)).toContainText('Habéis marcado 2');
  await expect(page.getByRole('region', { name: 'Lo que habéis reconocido' }).getByRole('link')).toHaveCount(1);
});

test('con el almacenamiento del navegador bloqueado, las tarjetas siguen funcionando', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('SecurityError');
      },
    });
  });
  await page.goto('/escenas/');
  await page.locator('[data-tarjeta]:visible').getByRole('button', { name: 'Esto lo hemos visto' }).click();
  await expect(progreso(page)).toContainText('Habéis marcado 1');
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await expect(progreso(page)).toHaveText(`Escena 2 de ${TOTAL} · Habéis marcado 1`);
});

test('se llega a las escenas desde la portada y desde el glosario', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.acciones').getByRole('link', { name: 'Escenas del día a día' })).toHaveAttribute('href', '/escenas/');
  await page.goto('/glosario/');
  await expect(page.getByRole('link', { name: 'escenas «¿Lo habéis visto?»' })).toHaveAttribute('href', '/escenas/');
});

test('las escenas de elegir son una tarjeta más, sin «Esto lo hemos visto»', async ({ page }) => {
  const id = ORDEN_ESCENAS.find((t) => t.startsWith('elegir-'))!;
  const indice = ORDEN_ESCENAS.indexOf(id);
  await page.goto(`/escenas/#escena-${ORDEN_ESCENAS[indice - 1]}`);
  await page.getByRole('button', { name: 'Siguiente' }).click();
  const tarjeta = page.locator(`#escena-${id}`);
  await expect(tarjeta).toBeVisible();
  await expect(tarjeta.getByRole('heading', { level: 2 })).toBeFocused();
  await expect(tarjeta.getByRole('button', { name: 'Esto lo hemos visto' })).toHaveCount(0);
  await expect(tarjeta.getByRole('link', { name: /^Leer la ficha de / })).toHaveCount(1);
  await tarjeta.locator('summary').first().click();
  await expect(tarjeta.locator('.explicacion').first()).toBeVisible();
  await expect(progreso(page)).toHaveText(`Escena ${indice + 1} de ${TOTAL} · Habéis marcado 0`);
});

test('una escena de elegir abierta cumple WCAG 2.2 AA en claro y en oscuro', async ({ page }) => {
  const id = ORDEN_ESCENAS.find((t) => t.startsWith('elegir-'))!;
  for (const esquema of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: esquema });
    await page.goto(`/escenas/#escena-${id}`);
    await page.locator(`#escena-${id} summary`).first().click();
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  }
});

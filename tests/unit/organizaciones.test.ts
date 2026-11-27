import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse } from 'yaml';
import { esquemaOrganizacion } from '../../src/lib/esquemas';

const CARPETA = resolve('src/content/organizaciones');
const archivos = readdirSync(CARPETA)
  .filter((f) => /\.ya?ml$/i.test(f))
  .sort();

const hoy = new Date();
const limiteHoy = Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth(), hoy.getUTCDate(), 23, 59, 59, 999);

describe('organizaciones de «A quién acudir»', () => {
  it('hay al menos una organización registrada', () => {
    expect(archivos.length).toBeGreaterThan(0);
  });

  for (const archivo of archivos) {
    const datos = parse(readFileSync(join(CARPETA, archivo), 'utf8'));

    it(`${archivo} cumple el esquema, usa HTTPS y tiene fecha de comprobación válida`, () => {
      const resultado = esquemaOrganizacion.safeParse(datos);
      expect(resultado.success, resultado.success ? '' : resultado.error.message).toBe(true);
      if (!resultado.success) return;

      expect(resultado.data.web.startsWith('https://')).toBe(true);
      expect(resultado.data.comprobado.getTime()).toBeLessThanOrEqual(limiteHoy);
    });
  }
});

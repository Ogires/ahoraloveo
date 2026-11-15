import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { expect, it } from 'vitest';
import { revisarVariedad, type Escena } from '../../src/lib/escenas';
import { ORDEN_ESCENAS, ordenarTarjetas } from '../../src/lib/tarjetas';

// La variedad se mira en el conjunto de escenas del glosario, no en cada ficha.
const carpeta = join(process.cwd(), 'src/content/glosario');
const terminos = readdirSync(carpeta)
  .filter((f) => /\.ya?ml$/.test(f))
  .map((f) => {
    const data = parse(readFileSync(join(carpeta, f), 'utf8'));
    return { id: f.replace(/\.ya?ml$/, ''), data: { ...data, escenas: (data.escenas ?? []) as Escena[] } };
  });

it('las escenas del glosario varían de edad, de lugar y de protagonista', () => {
  expect(revisarVariedad(terminos.flatMap((t) => t.data.escenas))).toEqual([]);
});

// Lo mismo que comprueba la compilación, pero antes: cada escena tiene su sitio en las tarjetas.
it('el orden de las tarjetas tiene todas las escenas, una vez cada una', () => {
  expect(ordenarTarjetas(terminos).length).toBe(ORDEN_ESCENAS.length);
});

it('en las tarjetas no van seguidas dos escenas de la misma familia', () => {
  const familias = ordenarTarjetas(terminos).map((t) => `${t.id} (${t.termino.data.familia})`);
  const seguidas = familias.filter((f, i) => i > 0 && f.split('(')[1] === familias[i - 1].split('(')[1]);
  expect(seguidas).toEqual([]);
});

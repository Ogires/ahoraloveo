import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { expect, it } from 'vitest';
import { problemasEscenarios } from '../../src/lib/elegir';
import { revisarVariedad, type Escena } from '../../src/lib/escenas';
import { ORDEN_ESCENAS, ordenarTarjetas } from '../../src/lib/tarjetas';

const leerCarpeta = (carpeta: string) =>
  readdirSync(join(process.cwd(), carpeta))
    .filter((f) => /\.ya?ml$/.test(f))
    .map((f) => ({ id: f.replace(/\.ya?ml$/, ''), datos: parse(readFileSync(join(process.cwd(), carpeta, f), 'utf8')) }));
const refs = (ids: string[] = []) => ids.map((id) => ({ id }));

// Las referencias van como { id }, igual que las entrega Astro.
const terminos = leerCarpeta('src/content/glosario').map(({ id, datos }) => ({
  id,
  data: { ...datos, escenas: (datos.escenas ?? []) as Escena[], fuentes: refs(datos.fuentes) },
}));
const escenarios = leerCarpeta('src/content/escenarios').map(({ id, datos }) => ({
  id,
  data: { ...datos, terminos: refs(datos.terminos), fuentes: refs(datos.fuentes) },
}));

// La variedad se mira en el conjunto de escenas del glosario, no en cada ficha.
it('las escenas del glosario varían de edad, de lugar y de protagonista', () => {
  expect(revisarVariedad(terminos.flatMap((t) => t.data.escenas))).toEqual([]);
});

// Lo mismo que comprueba la compilación, pero antes: cada escena tiene su sitio en las tarjetas.
it('el orden de las tarjetas tiene todas las escenas y las escenas de elegir, una vez cada una', () => {
  expect(ordenarTarjetas(terminos, escenarios).length).toBe(ORDEN_ESCENAS.length);
});

it('en las tarjetas no van seguidas dos de la misma familia', () => {
  const familia = new Map(terminos.map((t) => [t.id, t.data.familia as string]));
  const familias = ordenarTarjetas(terminos, escenarios).map((t) =>
    t.tipo === 'escena' ? t.termino.data.familia : familia.get(t.escenario.data.terminos[0].id),
  );
  const seguidas = ORDEN_ESCENAS.filter((_, i) => i > 0 && familias[i] === familias[i - 1]);
  expect(seguidas).toEqual([]);
});

it('las escenas de elegir solo citan fuentes de sus fichas, y esas fichas tienen «No confundir con»', () => {
  expect(problemasEscenarios(escenarios, terminos)).toEqual([]);
});

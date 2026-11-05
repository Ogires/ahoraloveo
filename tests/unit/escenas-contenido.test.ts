import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { expect, it } from 'vitest';
import { revisarVariedad, type Escena } from '../../src/lib/escenas';

// La variedad se mira en el conjunto de escenas del glosario, no en cada ficha.
const carpeta = join(process.cwd(), 'src/content/glosario');

it('las escenas del glosario varían de edad, de lugar y de protagonista', () => {
  const escenas: Escena[] = readdirSync(carpeta)
    .filter((f) => /\.ya?ml$/.test(f))
    .flatMap((f) => parse(readFileSync(join(carpeta, f), 'utf8')).escenas ?? []);
  expect(revisarVariedad(escenas)).toEqual([]);
});

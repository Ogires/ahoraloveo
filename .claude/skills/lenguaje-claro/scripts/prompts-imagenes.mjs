#!/usr/bin/env node
// Escribe un prompt por escena del glosario, para generar sus ilustraciones con Gemini.
//   node .claude/skills/lenguaje-claro/scripts/prompts-imagenes.mjs propuestas/imagenes/prompts.md
// El aspecto y el momento a dibujar de cada prompt quedan «(por decidir)»: se rellenan a mano
// mirando el conjunto, para que haya variedad (guía de escenas, apartado «Ilustraciones»).
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parse } from 'yaml';
import { promptEscena } from '../../../../src/lib/prompts-imagenes.ts';
import { FAMILIAS } from '../../../../src/lib/tokens.ts';

const salida = process.argv[2];
if (!salida) {
  console.error('Uso: node prompts-imagenes.mjs <fichero de salida>');
  process.exit(1);
}
const carpeta = join(process.cwd(), 'src/content/glosario');
const prompts = readdirSync(carpeta)
  .filter((f) => /\.ya?ml$/.test(f))
  .sort()
  .flatMap((f) => {
    const ficha = parse(readFileSync(join(carpeta, f), 'utf8'));
    const familia = FAMILIAS.find((x) => x.id === ficha.familia);
    const termino = f.replace(/\.ya?ml$/, '');
    return (ficha.escenas ?? []).map((e, i) => promptEscena({ termino, familia, n: i + 1, ...e }));
  });
mkdirSync(dirname(salida), { recursive: true });
writeFileSync(salida, `# Prompts de las ilustraciones\n\n${prompts.join('\n\n---\n\n')}\n`);
console.log(`${prompts.length} prompts en ${salida}`);

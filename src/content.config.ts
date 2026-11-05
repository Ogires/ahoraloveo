import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  crearEsquemaHerramienta,
  crearEsquemaPaso,
  crearEsquemaTermino,
  esquemaEntidad,
  esquemaFuente,
} from './lib/esquemas';

const fuentes = defineCollection({
  // .yml también: con solo **/*.yaml, una ficha guardada como .yml desaparecía sin aviso.
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/fuentes' }),
  schema: esquemaFuente,
});

const glosario = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/glosario' }),
  schema: crearEsquemaTermino({ fuentes: reference('fuentes'), glosario: reference('glosario') }),
});

const entidades = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/entidades' }),
  schema: esquemaEntidad,
});

const herramientas = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/herramientas' }),
  schema: crearEsquemaHerramienta({ fuentes: reference('fuentes'), glosario: reference('glosario') }),
});

const proceso = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/proceso' }),
  schema: crearEsquemaPaso({ fuentes: reference('fuentes'), herramientas: reference('herramientas') }),
});

export const collections = { fuentes, glosario, entidades, herramientas, proceso };

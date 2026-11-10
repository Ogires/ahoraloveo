import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  crearEsquemaApartado,
  crearEsquemaHerramienta,
  crearEsquemaMito,
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
  schema: ({ image }) =>
    crearEsquemaTermino({ fuentes: reference('fuentes'), glosario: reference('glosario'), imagen: image() }),
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

const mitos = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/mitos' }),
  schema: crearEsquemaMito({ fuentes: reference('fuentes'), glosario: reference('glosario') }),
});

// Apartados sueltos de una página, con sus fuentes y su fecha: «Los criterios» de /diagnostico/.
const apartados = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/apartados' }),
  schema: crearEsquemaApartado({ fuentes: reference('fuentes') }),
});

export const collections = { fuentes, glosario, entidades, herramientas, proceso, mitos, apartados };

import { describe, expect, it } from 'vitest';
import { z } from 'astro/zod';
import { crearEsquemaTermino, esquemaFuente } from '../../src/lib/esquemas';

const esquemaTermino = crearEsquemaTermino({ fuentes: z.string(), glosario: z.string() });

const termino = {
  termino: 'Crisis',
  alias: ['meltdown'],
  familia: 'emociones',
  que_es: 'Una reacción involuntaria.',
  como_se_ve: 'Llanto intenso.',
  en_ninas: 'Puede aguantar toda la jornada.',
  fuentes: ['nas-crisis'],
  revisado: '2026-10-30',
};

const fuente = {
  titulo: 'Meltdowns',
  autoria: 'National Autistic Society',
  anio: 2024,
  tipo: 'entidad',
  nivel: 'entidades',
  idioma: 'en',
  url: 'https://www.autism.org.uk/',
  comprobado: '2026-10-30',
};

const valido = (esquema: z.ZodType, datos: unknown) => esquema.safeParse(datos).success;

describe('esquema del glosario', () => {
  it('acepta una ficha completa, sin los campos opcionales', () => {
    expect(valido(esquemaTermino, termino)).toBe(true);
  });

  it('exige al menos una fuente', () => {
    expect(valido(esquemaTermino, { ...termino, fuentes: [] })).toBe(false);
  });

  it('exige la fecha de revisión', () => {
    const { revisado: _, ...sinFecha } = termino;
    expect(valido(esquemaTermino, sinFecha)).toBe(false);
  });

  it('exige el apartado «En niñas», aunque sea para decir que no hay datos', () => {
    expect(valido(esquemaTermino, { ...termino, en_ninas: '' })).toBe(false);
  });

  it('rechaza una familia que no existe', () => {
    expect(valido(esquemaTermino, { ...termino, familia: 'cognitivo' })).toBe(false);
  });
});

describe('esquema de fuentes', () => {
  it('acepta una fuente con URL', () => {
    expect(valido(esquemaFuente, fuente)).toBe(true);
  });

  it('acepta una fuente con DOI y sin URL', () => {
    const { url: _, ...sinUrl } = fuente;
    expect(valido(esquemaFuente, { ...sinUrl, doi: '10.1000/ejemplo' })).toBe(true);
  });

  it('exige URL o DOI', () => {
    const { url: _, ...sinUrl } = fuente;
    expect(valido(esquemaFuente, sinUrl)).toBe(false);
  });

  it('un estudio necesita sus datos: muestra, edades, porcentaje de niñas…', () => {
    expect(valido(esquemaFuente, { ...fuente, tipo: 'estudio', nivel: 'estudios' })).toBe(false);
  });

  it('acepta un estudio con sus datos', () => {
    const estudio = {
      diseno: 'Entrevistas', muestra: 92, edades: 'Adultos',
      porcentaje_ninas: 60, resultados_por_sexo: false,
    };
    expect(valido(esquemaFuente, { ...fuente, tipo: 'estudio', nivel: 'estudios', estudio })).toBe(true);
  });
});

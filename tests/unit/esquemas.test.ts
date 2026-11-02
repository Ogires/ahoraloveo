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

const estudio = {
  diseno: 'Entrevistas', muestra: 92, edades: 'Adultos',
  porcentaje_ninas: 60, resultados_por_sexo: false,
};

// Fechas que z.coerce.date() aceptaba y publicaba mal: vacía → 1970, solo el año → 1970, sin día → día 1.
const FECHAS_MAL = [null, 2026, '2026-10'];

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

  it.each(FECHAS_MAL)('rechaza %j como fecha de revisión', (revisado) => {
    expect(valido(esquemaTermino, { ...termino, revisado })).toBe(false);
  });

  it('lee la fecha igual en texto que como la entrega el YAML, ya convertida en Date', () => {
    const enTexto = esquemaTermino.parse(termino).revisado;
    const comoDate = esquemaTermino.parse({ ...termino, revisado: new Date('2026-10-30') }).revisado;
    expect(enTexto.toISOString()).toBe('2026-10-30T00:00:00.000Z');
    expect(comoDate.toISOString()).toBe('2026-10-30T00:00:00.000Z');
  });

  it.each(['', '   '])('exige el apartado «En niñas», aunque sea para decir que no hay datos (%j)', (en_ninas) => {
    expect(valido(esquemaTermino, { ...termino, en_ninas })).toBe(false);
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

  it.each(['javascript:alert(1)', 'mailto:hola@ejemplo.org', 'http:/autism.org.uk'])(
    'rechaza %s como URL: acabaría en un enlace roto o peligroso',
    (url) => {
      expect(valido(esquemaFuente, { ...fuente, url })).toBe(false);
    },
  );

  it.each(FECHAS_MAL)('rechaza %j como fecha de comprobación', (comprobado) => {
    expect(valido(esquemaFuente, { ...fuente, comprobado })).toBe(false);
  });

  it('un estudio necesita sus datos: muestra, edades, porcentaje de niñas…', () => {
    expect(valido(esquemaFuente, { ...fuente, tipo: 'estudio', nivel: 'estudios' })).toBe(false);
  });

  it('el porcentaje de niñas es obligatorio en un estudio (null si no lo da)', () => {
    const { porcentaje_ninas: _, ...sinPorcentaje } = estudio;
    const datos = { ...fuente, tipo: 'estudio', nivel: 'estudios', estudio: sinPorcentaje };
    expect(valido(esquemaFuente, datos)).toBe(false);
    expect(valido(esquemaFuente, { ...datos, estudio: { ...estudio, porcentaje_ninas: null } })).toBe(true);
  });

  it('acepta un estudio con sus datos', () => {
    expect(valido(esquemaFuente, { ...fuente, tipo: 'estudio', nivel: 'estudios', estudio })).toBe(true);
  });
});

describe('el nivel de una fuente encaja con su tipo', () => {
  it.each([
    ['estudio', 'consenso'],
    ['experiencia', 'consenso'],
    ['entidad', 'estudios'],
    ['guia-clinica', 'entidades'],
  ])('rechaza el tipo «%s» con el nivel «%s»', (tipo, nivel) => {
    const datos = { ...fuente, tipo, nivel, ...(tipo === 'estudio' ? { estudio } : {}) };
    expect(valido(esquemaFuente, datos)).toBe(false);
  });

  it('el error dice qué tipo y qué nivel no encajan', () => {
    const resultado = esquemaFuente.safeParse({ ...fuente, tipo: 'estudio', nivel: 'consenso', estudio });
    expect(resultado.error?.issues.map((i) => i.message)).toContain(
      'Una fuente de tipo «estudio» no puede tener el nivel «consenso»',
    );
  });

  it('una entidad o una fuente oficial pueden ser consenso, como la OMS', () => {
    expect(valido(esquemaFuente, { ...fuente, tipo: 'entidad', nivel: 'consenso' })).toBe(true);
    expect(valido(esquemaFuente, { ...fuente, tipo: 'oficial', nivel: 'consenso' })).toBe(true);
  });

  it('solo los estudios llevan datos de muestra', () => {
    expect(valido(esquemaFuente, { ...fuente, estudio })).toBe(false);
  });
});

import { z } from 'astro/zod';
import { IDS_FAMILIAS } from './tokens';

// Niveles de fuente (sección 6 del diseño) y cómo se nombran en la web.
export const NIVELES = {
  consenso: 'Consenso: guías clínicas y revisiones',
  estudios: 'Estudio',
  entidades: 'Entidad',
  oficial: 'Fuente oficial',
  experiencia: 'Experiencia',
} as const;
const IDS_NIVELES = Object.keys(NIVELES) as [keyof typeof NIVELES, ...(keyof typeof NIVELES)[]];

const TIPOS = ['guia-clinica', 'revision', 'estudio', 'entidad', 'oficial', 'experiencia'] as const;

export const esquemaFuente = z
  .object({
    titulo: z.string().min(1),
    autoria: z.string().min(1),
    anio: z.number().int().min(1900),
    tipo: z.enum(TIPOS),
    nivel: z.enum(IDS_NIVELES),
    idioma: z.string().regex(/^[a-z]{2}$/),
    url: z.url().optional(),
    doi: z.string().regex(/^10\.\d{4,9}\/\S+$/).optional(),
    licencia: z.string().optional(),
    comprobado: z.coerce.date(),
    temas: z.array(z.string()).default([]),
    estudio: z
      .object({
        diseno: z.string().min(1),
        muestra: z.number().int().positive(),
        edades: z.string().min(1),
        porcentaje_ninas: z.number().min(0).max(100).nullable(),
        resultados_por_sexo: z.boolean(),
      })
      .optional(),
  })
  .refine((f) => f.url || f.doi, { message: 'Cada fuente necesita una URL o un DOI' })
  .refine((f) => f.tipo !== 'estudio' || f.estudio, {
    message: 'Un estudio necesita su diseño, muestra, edades, porcentaje de niñas y si separa resultados por sexo',
    path: ['estudio'],
  });

// Recibe las referencias ya creadas, para que Vitest pueda probar el esquema sin astro:content.
// Es genérica para no perder sus tipos: con z.ZodType, getEntries() no aceptaría las fuentes.
export const crearEsquemaTermino = <F extends z.ZodType, G extends z.ZodType>(referencias: {
  fuentes: F;
  glosario: G;
}) =>
  z.object({
    termino: z.string().min(1),
    alias: z.array(z.string()).default([]),
    familia: z.enum(IDS_FAMILIAS),
    que_es: z.string().min(1),
    como_se_ve: z.string().min(1),
    no_confundir_con: z.string().optional(),
    en_ninas: z.string().min(1), // texto, o «Sin datos sobre niñas» con su explicación
    que_hacer: z.string().optional(),
    relacionados: z.array(referencias.glosario).default([]),
    fuentes: z.array(referencias.fuentes).min(1, 'Cada término necesita al menos una fuente'),
    revisado: z.coerce.date(),
  });

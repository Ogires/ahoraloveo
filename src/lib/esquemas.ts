import { z } from 'astro/zod';
import { IDS_FAMILIAS } from './tokens';

// Niveles de fuente (sección 6 del diseño) y cómo se nombran en la web.
export const NIVELES = {
  consenso: 'Consenso: guías clínicas y revisiones',
  estudios: 'Estudio',
  entidades: 'Entidad',
  divulgacion: 'Divulgación: libros de especialistas',
  oficial: 'Fuente oficial',
  experiencia: 'Experiencia',
} as const;
type Nivel = keyof typeof NIVELES;
const IDS_NIVELES = Object.keys(NIVELES) as [Nivel, ...Nivel[]];

const TIPOS = ['guia-clinica', 'revision', 'estudio', 'entidad', 'oficial', 'experiencia', 'libro'] as const;
type Tipo = (typeof TIPOS)[number];

// Qué niveles admite cada tipo, para que el peso de una fuente no se infle.
// Una entidad o una fuente oficial pueden ser consenso: es el caso de la OMS.
const NIVELES_POR_TIPO: Record<Tipo, Nivel[]> = {
  'guia-clinica': ['consenso'],
  revision: ['consenso'],
  estudio: ['estudios'],
  entidad: ['entidades', 'consenso'],
  oficial: ['oficial', 'consenso'],
  experiencia: ['experiencia'],
  // Un libro de especialista es divulgación; uno escrito desde la propia vivencia, experiencia.
  libro: ['divulgacion', 'experiencia'],
};

// ISBN-10 o ISBN-13, con o sin guiones. El dígito de control caza las cifras mal copiadas.
function isbnValido(isbn: string): boolean {
  const cifras = isbn.replace(/-/g, '');
  if (/^97[89]\d{10}$/.test(cifras)) {
    const suma = [...cifras].reduce((total, c, i) => total + Number(c) * (i % 2 ? 3 : 1), 0);
    return suma % 10 === 0;
  }
  if (/^\d{9}[\dX]$/.test(cifras)) {
    const suma = [...cifras].reduce((total, c, i) => total + (c === 'X' ? 10 : Number(c)) * (10 - i), 0);
    return suma % 11 === 0;
  }
  return false;
}

const texto = () => z.string().trim().min(1);

// El YAML entrega 2026-10-30 ya convertido en Date; en texto solo vale AAAA-MM-DD.
// z.coerce.date() convertía un campo vacío en el 1 de enero de 1970.
const fecha = () =>
  z.union([z.date(), z.iso.date().transform((dia) => new Date(dia))], {
    error: 'Falta la fecha o no tiene el formato AAAA-MM-DD',
  });

export const esquemaFuente = z
  .object({
    titulo: texto(),
    autoria: texto(),
    anio: z.number().int().min(1900),
    tipo: z.enum(TIPOS),
    nivel: z.enum(IDS_NIVELES),
    idioma: z.string().regex(/^[a-z]{2}$/),
    url: z.httpUrl().optional(),
    doi: z.string().regex(/^10\.\d{4,9}\/\S+$/).optional(),
    isbn: z.string().refine(isbnValido, 'El ISBN no es válido: revisa que esté bien copiado').optional(),
    editorial: texto().optional(),
    licencia: z.string().optional(),
    comprobado: fecha(),
    temas: z.array(z.string()).default([]),
    estudio: z
      .object({
        diseno: texto(),
        muestra: z.number().int().positive(),
        edades: texto(),
        porcentaje_ninas: z.number().min(0).max(100).nullable(),
        resultados_por_sexo: z.boolean(),
      })
      .optional(),
  })
  .refine((f) => f.url || f.doi || f.isbn, { message: 'Cada fuente necesita una URL, un DOI o un ISBN' })
  .refine((f) => f.tipo !== 'libro' || f.editorial, {
    message: 'Un libro necesita su editorial',
    path: ['editorial'],
  })
  .refine((f) => f.tipo !== 'estudio' || f.estudio, {
    message: 'Un estudio necesita su diseño, muestra, edades, porcentaje de niñas y si separa resultados por sexo',
    path: ['estudio'],
  })
  .refine((f) => f.tipo === 'estudio' || !f.estudio, {
    message: 'Solo los estudios llevan datos de muestra',
    path: ['estudio'],
  })
  .superRefine((f, ctx) => {
    if (!NIVELES_POR_TIPO[f.tipo].includes(f.nivel)) {
      ctx.addIssue({
        code: 'custom',
        message: `Una fuente de tipo «${f.tipo}» no puede tener el nivel «${f.nivel}»`,
        path: ['nivel'],
      });
    }
  });

// Recibe las referencias ya creadas, para que Vitest pueda probar el esquema sin astro:content.
// Es genérica para no perder sus tipos: con z.ZodType, getEntries() no aceptaría las fuentes.
export const crearEsquemaTermino = <F extends z.ZodType, G extends z.ZodType>(referencias: {
  fuentes: F;
  glosario: G;
}) =>
  z.object({
    termino: texto(),
    alias: z.array(z.string()).default([]),
    familia: z.enum(IDS_FAMILIAS),
    que_es: texto(),
    como_se_ve: texto(),
    no_confundir_con: z.string().optional(),
    en_ninas: texto(), // texto, o «Sin datos sobre niñas» con su explicación
    que_hacer: z.string().optional(),
    relacionados: z.array(referencias.glosario).default([]),
    fuentes: z.array(referencias.fuentes).min(1, 'Cada término necesita al menos una fuente'),
    revisado: fecha(),
  });

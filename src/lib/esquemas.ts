import { z } from 'astro/zod';
import { contarPalabras, edadValida } from './escenas';
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

const TIPOS = ['guia-clinica', 'revision', 'estudio', 'entidad', 'editorial', 'oficial', 'experiencia', 'libro'] as const;
type Tipo = (typeof TIPOS)[number];

// Qué niveles admite cada tipo, para que el peso de una fuente no se infle.
// Una entidad o una fuente oficial pueden ser consenso: es el caso de la OMS.
const NIVELES_POR_TIPO: Record<Tipo, Nivel[]> = {
  'guia-clinica': ['consenso'],
  revision: ['consenso'],
  estudio: ['estudios'],
  entidad: ['entidades', 'consenso'],
  // La editorial que publica una prueba en España: solo para sus datos técnicos (edades, formato, duración).
  editorial: ['entidades'],
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
    // «sin fecha» se escribe a propósito, para las páginas que no la dicen: un año olvidado da error.
    anio: z.union([z.number().int().min(1900), z.literal('sin fecha')]),
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

// Entidades que las fichas nombran en el texto («AETAPI explica…»): su primera mención enlaza a su web.
export const esquemaEntidad = z.object({
  nombre: texto(), // tal como se escribe en las fichas
  otros_nombres: z.array(texto()).default([]),
  web: z.httpUrl(),
  idioma: z.string().regex(/^[a-z]{2}$/).default('es'),
});

// Una escena del día a día (guía en .claude/skills/lenguaje-claro/references/escenas.md).
export const esquemaEscena = z.object({
  edad: texto().refine(edadValida, 'La edad va de «1 mes» a «12 años», escrita así: «18 meses», «4 años»'),
  lugar: texto(),
  protagonista: z.enum(['nina', 'nino']),
  texto: texto().refine((t) => contarPalabras(t) <= 60, 'Una escena tiene 60 palabras como mucho'),
});

// Recibe las referencias ya creadas, para que Vitest pueda probar el esquema sin astro:content.
// Es genérica para no perder sus tipos: con z.ZodType, getEntries() no aceptaría las fuentes.
export const crearEsquemaTermino = <F extends z.ZodType, G extends z.ZodType>(referencias: {
  fuentes: F;
  glosario: G;
}) =>
  z.object({
    // El título es el nombre que más se usa en español al hablar de autismo: «Meltdown», «Alexitimia».
    termino: texto(),
    // El otro nombre va debajo del título. Si el título está en inglés, sus nombres en español
    // (los que la familia puede haber oído en la consulta); si está en español, el original en
    // inglés (con el que se busca la literatura). Uno de los dos, nunca ambos.
    en_espanol: z.array(texto()).default([]),
    en_ingles: texto().optional(),
    alias: z.array(z.string()).default([]), // otros nombres, como los que usan los estudios
    familia: z.enum(IDS_FAMILIAS),
    que_es: texto(),
    como_se_ve: texto(),
    no_confundir_con: z.string().optional(),
    en_ninas: texto(), // texto, o «Sin datos sobre niñas» con su explicación
    que_hacer: z.string().optional(),
    escenas: z.array(esquemaEscena).max(3, 'Una ficha tiene tres escenas como mucho').default([]),
    relacionados: z.array(referencias.glosario).default([]),
    fuentes: z.array(referencias.fuentes).min(1, 'Cada término necesita al menos una fuente'),
    revisado: fecha(),
  }).superRefine((t, ctx) => {
    if ((t.en_ingles === undefined) === (t.en_espanol.length === 0)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Pon en_espanol si el título está en inglés, o en_ingles si está en español (uno de los dos)',
        path: ['en_ingles'],
      });
    }
  });

// Herramientas de diagnóstico (iteración 1) y cómo se nombran en la web.
export const TIPOS_HERRAMIENTA = {
  cribado: 'Cribado',
  diagnostico: 'Diagnóstico',
  complementaria: 'Complementaria',
} as const;
export const FORMATOS = {
  cuestionario: 'Cuestionario',
  entrevista: 'Entrevista',
  observacion: 'Observación',
  prueba: 'Prueba',
} as const;
// Las dos primeras siguen los dos bloques del DSM-5; las otras, lo que miden las complementarias.
export const AREAS = {
  'comunicacion-social': 'Comunicación e interacción social',
  'repetitivas-sensorial': 'Conductas repetitivas, intereses y sensorial',
  desarrollo: 'Desarrollo e inteligencia',
  'vida-diaria': 'Vida diaria',
} as const;
export type TipoHerramienta = keyof typeof TIPOS_HERRAMIENTA;
export type Area = keyof typeof AREAS;
const ids = <T extends Record<string, string>>(o: T) => Object.keys(o) as [keyof T & string, ...(keyof T & string)[]];

export const crearEsquemaHerramienta = <F extends z.ZodType, G extends z.ZodType>(referencias: {
  fuentes: F;
  glosario: G;
}) =>
  z.object({
    nombre: texto(), // el nombre corto, como lo dice el profesional: «ADOS-2»
    nombre_completo: texto(),
    tipo: z.enum(ids(TIPOS_HERRAMIENTA)),
    edades: texto(),
    quien: texto(), // quién la pasa o la responde
    formato: z.array(z.enum(ids(FORMATOS))).min(1),
    duracion: texto(),
    areas: z.array(z.enum(ids(AREAS))).min(1, 'Cada herramienta mide al menos un área'),
    que_es: texto(),
    que_mide: texto(),
    como_se_interpreta: texto(),
    limitaciones: texto(),
    en_ninas: texto(), // texto, o «Sin datos sobre niñas» con su explicación
    que_preguntar: z.array(texto()).min(1),
    relacionados: z.array(referencias.glosario).default([]),
    fuentes: z.array(referencias.fuentes).min(1, 'Cada herramienta necesita al menos una fuente'),
    revisado: fecha(),
  });

// Los pasos del proceso de diagnóstico. El recuadro valenciano solo va donde algo cambia y está documentado.
export const crearEsquemaPaso = <F extends z.ZodType, H extends z.ZodType>(referencias: {
  fuentes: F;
  herramientas: H;
}) =>
  z.object({
    orden: z.number().int().min(1),
    titulo: texto(),
    que_pasa: texto(),
    quien: texto().optional(),
    que_hacer: texto(),
    herramientas: z.array(referencias.herramientas).default([]),
    comunitat_valenciana: z
      .object({
        texto: texto(),
        fuentes: z.array(referencias.fuentes).min(1),
        comprobado: fecha(),
      })
      .optional(),
    fuentes: z.array(referencias.fuentes).min(1, 'Cada paso necesita al menos una fuente'),
    revisado: fecha(),
  });

// Las comillas del mito las pone la página: en el YAML van sin ellas.
const sinComillas = () =>
  texto().refine((t) => !/^[«"“']|[»"”']$/.test(t), 'Escribe el mito sin comillas: las pone la página');

// Un mito sobre el autismo (guía en .claude/skills/lenguaje-claro/references/mitos.md).
// Primero el mito y justo debajo el dato, que también es la descripción de la página.
export const crearEsquemaMito = <F extends z.ZodType, G extends z.ZodType>(referencias: {
  fuentes: F;
  glosario: G;
}) =>
  z.object({
    mito: sinComillas(),
    variantes: z.array(sinComillas()).max(3, 'Un mito tiene tres variantes como mucho').default([]),
    dato: texto().refine((t) => contarPalabras(t) <= 25, 'El dato es una frase de 25 palabras como mucho'),
    por_que: texto(),
    de_donde_viene: texto().optional(),
    que_hacer: texto(),
    relacionados: z.array(referencias.glosario).default([]),
    fuentes: z.array(referencias.fuentes).min(1, 'Cada mito necesita al menos una fuente'),
    orden: z.number().int().min(1),
    revisado: fecha(),
  });

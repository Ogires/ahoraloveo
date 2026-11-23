import { describe, expect, it } from 'vitest';
import { z } from 'astro/zod';
import {
  crearEsquemaApartado,
  crearEsquemaEscenario,
  crearEsquemaHerramienta,
  crearEsquemaMito,
  crearEsquemaPaso,
  crearEsquemaPrograma,
  crearEsquemaTermino,
  esquemaEntidad,
  esquemaFuente,
} from '../../src/lib/esquemas';

const esquemaTermino = crearEsquemaTermino({ fuentes: z.string(), glosario: z.string(), imagen: z.string() });
const esquemaHerramienta = crearEsquemaHerramienta({ fuentes: z.string(), glosario: z.string() });
const esquemaPaso = crearEsquemaPaso({ fuentes: z.string(), herramientas: z.string() });

const herramienta = {
  nombre: 'M-CHAT-R/F',
  nombre_completo: 'Modified Checklist for Autism in Toddlers, Revised with Follow-Up',
  tipo: 'cribado',
  edades: 'De 16 a 30 meses',
  quien: 'Responde la familia; la entrevista de seguimiento la hace un profesional',
  formato: ['cuestionario', 'entrevista'],
  duracion: 'Unos 5 minutos',
  areas: ['comunicacion-social', 'repetitivas-sensorial'],
  que_es: 'Un cuestionario para la familia.',
  que_mide: 'La comunicación y el juego.',
  como_se_interpreta: 'Riesgo bajo, medio o alto.',
  limitaciones: 'Orienta; no diagnostica.',
  en_ninas: 'Sin datos sobre niñas.',
  que_preguntar: ['¿Qué pasa ahora?'],
  fuentes: ['previnfad-tea'],
  revisado: '2026-11-05',
};

const termino = {
  termino: 'Meltdown',
  en_espanol: ['crisis'],
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

  it('acepta un título en español con su original en inglés', () => {
    const { en_espanol: _, ...sinEspanol } = termino;
    expect(valido(esquemaTermino, { ...sinEspanol, termino: 'Alexitimia', en_ingles: 'alexithymia' })).toBe(true);
  });

  it('exige el otro nombre: en español si el título va en inglés, o en inglés si va en español', () => {
    const { en_espanol: _, ...sinNinguno } = termino;
    expect(valido(esquemaTermino, sinNinguno)).toBe(false);
    expect(valido(esquemaTermino, { ...termino, en_espanol: [] })).toBe(false);
  });

  it('rechaza los dos a la vez, porque entonces no se sabe en qué idioma está el título', () => {
    expect(valido(esquemaTermino, { ...termino, en_ingles: 'meltdown' })).toBe(false);
  });

  const escena = {
    edad: '4 años',
    lugar: 'en una fiesta de cumpleaños',
    protagonista: 'nina',
    texto: 'Se aparta a un rincón.',
    por_que: 'Puede que el ruido de la fiesta la desborde.',
  };

  it('acepta de una a tres escenas, y ninguna', () => {
    expect(valido(esquemaTermino, { ...termino, escenas: [escena] })).toBe(true);
    expect(valido(esquemaTermino, { ...termino, escenas: [escena, escena, escena] })).toBe(true);
    expect(valido(esquemaTermino, termino)).toBe(true);
  });

  it('rechaza más de tres escenas', () => {
    expect(valido(esquemaTermino, { ...termino, escenas: [escena, escena, escena, escena] })).toBe(false);
  });

  it('rechaza una escena de más de 60 palabras', () => {
    expect(valido(esquemaTermino, { ...termino, escenas: [{ ...escena, texto: 'palabra '.repeat(61) }] })).toBe(false);
  });

  it('rechaza una escena sin lugar, con una edad fuera de 0 a 12 años o con otro protagonista', () => {
    const { lugar: _, ...sinLugar } = escena;
    expect(valido(esquemaTermino, { ...termino, escenas: [sinLugar] })).toBe(false);
    expect(valido(esquemaTermino, { ...termino, escenas: [{ ...escena, edad: '14 años' }] })).toBe(false);
    expect(valido(esquemaTermino, { ...termino, escenas: [{ ...escena, protagonista: 'nena' }] })).toBe(false);
  });

  // El reverso de la tarjeta y el desplegable de la ficha explican cómo la escena muestra el término.
  it('rechaza una escena sin «Por qué es un ejemplo» o con uno de más de 40 palabras', () => {
    const { por_que: _, ...sinPorQue } = escena;
    expect(valido(esquemaTermino, { ...termino, escenas: [sinPorQue] })).toBe(false);
    expect(valido(esquemaTermino, { ...termino, escenas: [{ ...escena, por_que: 'palabra '.repeat(41) }] })).toBe(false);
    expect(valido(esquemaTermino, { ...termino, escenas: [{ ...escena, por_que: 'palabra '.repeat(40) }] })).toBe(true);
  });

  it('rechaza una familia que no existe', () => {
    expect(valido(esquemaTermino, { ...termino, familia: 'cognitivo' })).toBe(false);
  });

  it('una escena puede llevar ilustración, o no llevarla', () => {
    const escena = { edad: '6 años', lugar: 'en la terraza de un bar', protagonista: 'nina', texto: 'Se balancea.', por_que: 'Le calma.' };
    const conImagen = { ...escena, imagen: '../../assets/escenas/estereotipias-3.webp' };
    const r = esquemaTermino.parse({ ...termino, escenas: [escena, conImagen] });
    expect(r.escenas[0].imagen).toBeUndefined();
    expect(r.escenas[1].imagen).toBe('../../assets/escenas/estereotipias-3.webp');
  });
});

describe('esquema de fuentes', () => {
  it('acepta una fuente con URL', () => {
    expect(valido(esquemaFuente, fuente)).toBe(true);
  });

  it('acepta una editorial con nivel «entidades», para los datos técnicos de una prueba', () => {
    expect(valido(esquemaFuente, { ...fuente, tipo: 'editorial', nivel: 'entidades' })).toBe(true);
  });

  it('no deja que una editorial pese como consenso', () => {
    expect(valido(esquemaFuente, { ...fuente, tipo: 'editorial', nivel: 'consenso' })).toBe(false);
  });

  it('acepta «sin fecha» en una página que no la dice', () => {
    expect(valido(esquemaFuente, { ...fuente, anio: 'sin fecha' })).toBe(true);
  });

  it('exige el año, o «sin fecha» puesto a propósito', () => {
    const { anio: _, ...sinAnio } = fuente;
    expect(valido(esquemaFuente, sinAnio)).toBe(false);
    expect(valido(esquemaFuente, { ...fuente, anio: 'sin año' })).toBe(false);
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

describe('esquema de entidades', () => {
  const entidad = { nombre: 'AETAPI', web: 'https://aetapi.org/' };

  it('acepta una entidad con nombre y web; idioma y otros nombres tienen valor por defecto', () => {
    expect(esquemaEntidad.parse(entidad)).toEqual({ ...entidad, otros_nombres: [], idioma: 'es' });
  });

  it.each(['aetapi.org', 'javascript:alert(1)'])('rechaza %s como web', (web) => {
    expect(valido(esquemaEntidad, { ...entidad, web })).toBe(false);
  });
});

describe('libros', () => {
  const { url: _, ...sinUrl } = fuente;
  const libro = {
    ...sinUrl,
    titulo: 'La ansiedad en el autismo',
    autoria: 'Isabel Paula',
    tipo: 'libro',
    nivel: 'divulgacion',
    idioma: 'es',
    editorial: 'Alianza Editorial',
    isbn: '978-84-206-9756-7',
  };

  it('acepta un libro con su ISBN, sin URL ni DOI', () => {
    expect(valido(esquemaFuente, libro)).toBe(true);
  });

  it('un libro escrito en primera persona puede ser experiencia', () => {
    expect(valido(esquemaFuente, { ...libro, nivel: 'experiencia' })).toBe(true);
  });

  it.each(['consenso', 'estudios', 'entidades'])('un libro no puede ser «%s»', (nivel) => {
    expect(valido(esquemaFuente, { ...libro, nivel })).toBe(false);
  });

  it('la divulgación es solo para libros', () => {
    expect(valido(esquemaFuente, { ...fuente, nivel: 'divulgacion' })).toBe(false);
  });

  it('un libro necesita su editorial', () => {
    const { editorial: _e, ...sinEditorial } = libro;
    expect(valido(esquemaFuente, sinEditorial)).toBe(false);
  });

  it('sin ISBN, URL ni DOI no hay forma de encontrar la fuente', () => {
    const { isbn: _i, ...sinIsbn } = libro;
    expect(valido(esquemaFuente, sinIsbn)).toBe(false);
  });

  it.each(['978-84-9104-953-1', '9788418139178', '84-206-9756-7', '0-306-40615-2'])(
    'acepta el ISBN %s',
    (isbn) => {
      expect(valido(esquemaFuente, { ...libro, isbn })).toBe(true);
    },
  );

  // Una cifra mal copiada o cambiada de sitio hace que el dígito de control no cuadre.
  it.each(['978-84-206-9756-8', '978-84-206-9765-7', '84-206-9756-2', '978-84-206', 'ISBN 978-84-206-9756-7'])(
    'rechaza %s como ISBN',
    (isbn) => {
      expect(valido(esquemaFuente, { ...libro, isbn })).toBe(false);
    },
  );
});

describe('esquema de las herramientas', () => {
  it('acepta una ficha completa', () => {
    expect(valido(esquemaHerramienta, herramienta)).toBe(true);
  });

  it('exige al menos una fuente', () => {
    expect(valido(esquemaHerramienta, { ...herramienta, fuentes: [] })).toBe(false);
  });

  it('exige el apartado «En niñas», aunque sea para decir que no hay datos', () => {
    expect(valido(esquemaHerramienta, { ...herramienta, en_ninas: ' ' })).toBe(false);
  });

  it('rechaza un tipo que no existe', () => {
    expect(valido(esquemaHerramienta, { ...herramienta, tipo: 'evaluacion' })).toBe(false);
  });

  it('rechaza un área que no existe y exige al menos una', () => {
    expect(valido(esquemaHerramienta, { ...herramienta, areas: ['sensorial'] })).toBe(false);
    expect(valido(esquemaHerramienta, { ...herramienta, areas: [] })).toBe(false);
  });

  it('exige al menos un formato y una pregunta para el profesional', () => {
    expect(valido(esquemaHerramienta, { ...herramienta, formato: [] })).toBe(false);
    expect(valido(esquemaHerramienta, { ...herramienta, que_preguntar: [] })).toBe(false);
  });
});

const paso = {
  orden: 3,
  titulo: 'Cribado',
  que_pasa: 'Un cuestionario corto.',
  que_hacer: 'Preguntad qué significa el resultado.',
  herramientas: ['m-chat-r-f'],
  fuentes: ['previnfad-tea'],
  revisado: '2026-11-05',
};

describe('esquema de los pasos del proceso', () => {
  it('acepta un paso sin recuadro valenciano ni «quién interviene»', () => {
    expect(valido(esquemaPaso, paso)).toBe(true);
  });

  it('acepta el recuadro valenciano con su texto, fuentes y fecha de comprobación', () => {
    const comunitat_valenciana = { texto: 'Atención temprana.', fuentes: ['decreto-27-2023'], comprobado: '2026-11-05' };
    expect(valido(esquemaPaso, { ...paso, comunitat_valenciana })).toBe(true);
  });

  it('el recuadro valenciano exige fuentes y fecha de comprobación', () => {
    expect(valido(esquemaPaso, { ...paso, comunitat_valenciana: { texto: 'Atención temprana.', fuentes: [] } })).toBe(false);
  });

  it('exige al menos una fuente y un orden entero positivo', () => {
    expect(valido(esquemaPaso, { ...paso, fuentes: [] })).toBe(false);
    expect(valido(esquemaPaso, { ...paso, orden: 0 })).toBe(false);
    expect(valido(esquemaPaso, { ...paso, orden: 2.5 })).toBe(false);
  });
});

const esquemaMito = crearEsquemaMito({ fuentes: z.string(), glosario: z.string() });

const mito = {
  mito: 'Las vacunas causan autismo',
  dato: 'Los estudios más grandes, con cientos de miles de niñas y niños, no encuentran ninguna relación.',
  por_que: 'Explicación.',
  que_hacer: 'Qué podéis hacer.',
  fuentes: ['escap-2021'],
  orden: 1,
  revisado: '2026-11-09',
};

describe('esquema de los mitos', () => {
  it('acepta un mito completo, sin los campos opcionales', () => {
    const r = esquemaMito.parse(mito);
    expect(r.variantes).toEqual([]);
    expect(r.relacionados).toEqual([]);
  });

  it('exige al menos una fuente', () => {
    expect(esquemaMito.safeParse({ ...mito, fuentes: [] }).success).toBe(false);
  });

  it('el dato es una frase de 25 palabras como mucho', () => {
    const largo = Array.from({ length: 26 }, () => 'palabra').join(' ');
    const r = esquemaMito.safeParse({ ...mito, dato: largo });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error)).toContain('25 palabras');
  });

  it('acepta hasta tres variantes y rechaza la cuarta', () => {
    expect(esquemaMito.safeParse({ ...mito, variantes: ['a', 'b', 'c'] }).success).toBe(true);
    expect(esquemaMito.safeParse({ ...mito, variantes: ['a', 'b', 'c', 'd'] }).success).toBe(false);
  });

  it('el mito y sus variantes van sin comillas, porque las pone la página', () => {
    expect(esquemaMito.safeParse({ ...mito, mito: '«Las vacunas causan autismo»' }).success).toBe(false);
    expect(esquemaMito.safeParse({ ...mito, variantes: ['"Es cosa de chicos"'] }).success).toBe(false);
  });

  it('exige un orden entero positivo y la fecha de revisión', () => {
    expect(esquemaMito.safeParse({ ...mito, orden: 0 }).success).toBe(false);
    expect(esquemaMito.safeParse({ ...mito, orden: 1.5 }).success).toBe(false);
    const { revisado: _, ...sinFecha } = mito;
    expect(esquemaMito.safeParse(sinFecha).success).toBe(false);
  });
});

const esquemaApartado = crearEsquemaApartado({ fuentes: z.string() });

const apartado = {
  titulo: 'Los criterios: DSM-5 y CIE-11',
  parrafos: ['Las pruebas no diagnostican por sí solas.'],
  que_hacer: 'Preguntad con qué manual se ha hecho el diagnóstico.',
  fuentes: ['escap-2021'],
  revisado: '2026-11-10',
};

describe('esquema de los apartados sueltos de una página', () => {
  it('acepta un apartado con sus párrafos, qué hacer, fuentes y fecha', () => {
    expect(esquemaApartado.safeParse(apartado).success).toBe(true);
  });

  it('exige al menos un párrafo y una fuente', () => {
    expect(esquemaApartado.safeParse({ ...apartado, parrafos: [] }).success).toBe(false);
    expect(esquemaApartado.safeParse({ ...apartado, fuentes: [] }).success).toBe(false);
  });

  it('un apartado es corto: cuatro párrafos como mucho', () => {
    const r = esquemaApartado.safeParse({ ...apartado, parrafos: ['a', 'b', 'c', 'd', 'e'] });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error)).toContain('cuatro párrafos');
  });

  it('exige la fecha de revisión', () => {
    const { revisado: _, ...sinFecha } = apartado;
    expect(esquemaApartado.safeParse(sinFecha).success).toBe(false);
  });
});

const esquemaEscenario = crearEsquemaEscenario({ fuentes: z.string(), glosario: z.string() });
const escenario = {
  pregunta: '¿Crisis o rabieta?',
  edad: '5 años',
  lugar: 'en la piscina',
  protagonista: 'nino',
  situacion: 'Llora y da patadas. Le dan lo que pedía y sigue igual.',
  opciones: [
    { texto: 'Una crisis', explicacion: 'Encaja mejor con una crisis, porque no para al conseguirlo.' },
    { texto: 'Una rabieta', explicacion: 'Desde fuera se parecen, pero encaja mejor con una crisis.' },
    { texto: 'No lo sé', explicacion: 'Es lógico dudar. La pista está en lo que pasa al dárselo.' },
  ],
  terminos: ['meltdown'],
  fuentes: ['nas-crisis'],
  revisado: '2026-11-16',
};
const conExplicacion = (explicacion: string) => ({
  ...escenario,
  opciones: [{ ...escenario.opciones[0], explicacion }, ...escenario.opciones.slice(1)],
});

describe('esquema de las escenas de elegir', () => {
  it('acepta una escena con su pregunta, su situación, sus opciones y sus fuentes', () => {
    expect(esquemaEscenario.safeParse(escenario).success).toBe(true);
  });

  it('la última opción es siempre «No lo sé»', () => {
    const r = esquemaEscenario.safeParse({ ...escenario, opciones: escenario.opciones.slice(0, 2).concat(escenario.opciones[0]) });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error)).toContain('No lo sé');
  });

  it('lleva dos o tres opciones, más «No lo sé»', () => {
    expect(esquemaEscenario.safeParse({ ...escenario, opciones: escenario.opciones.slice(1) }).success).toBe(false);
    const cinco = [escenario.opciones[0], escenario.opciones[0], escenario.opciones[0], ...escenario.opciones.slice(1)];
    expect(esquemaEscenario.safeParse({ ...escenario, opciones: cinco }).success).toBe(false);
  });

  it('no es un examen: rechaza «correcto», «fallo» y parecidas, pero no las palabras que las contienen', () => {
    for (const mal of ['¡Correcto! Es una crisis.', 'Has fallado: es una crisis.', 'Es un error pensar que es una rabieta.', 'Respuesta acertada.']) {
      expect(esquemaEscenario.safeParse(conExplicacion(mal)).success, mal).toBe(false);
    }
    expect(esquemaEscenario.safeParse(conExplicacion('Encaja mejor con una crisis, aunque haya errores de juicio')).success).toBe(true);
  });

  it('la pregunta va entre signos de interrogación y la situación no pasa de 60 palabras', () => {
    expect(esquemaEscenario.safeParse({ ...escenario, pregunta: 'Crisis o rabieta' }).success).toBe(false);
    expect(esquemaEscenario.safeParse({ ...escenario, situacion: 'palabra '.repeat(61) }).success).toBe(false);
  });

  it('exige un término, una fuente y la fecha', () => {
    expect(esquemaEscenario.safeParse({ ...escenario, terminos: [] }).success).toBe(false);
    expect(esquemaEscenario.safeParse({ ...escenario, fuentes: [] }).success).toBe(false);
    const { revisado: _, ...sinFecha } = escenario;
    expect(esquemaEscenario.safeParse(sinFecha).success).toBe(false);
  });
});

const esquemaPrograma = crearEsquemaPrograma({ fuentes: z.string(), glosario: z.string() });

const programa = {
  nombre: 'Unstuck and On Target',
  para_que: 'Un programa para el cole que trabaja la flexibilidad.',
  edades: 'De 8 a 11 años',
  edad_desde: 8,
  edad_hasta: 11,
  quien: 'El profesorado, con formación',
  formato: 'En grupo, en el colegio',
  duracion: '21 sesiones de 30 a 40 minutos',
  en_espana: 'Sin datos sobre su uso en España.',
  peso: 'ensayo',
  que_es: 'Un programa escolar.',
  como_es: 'En cada sesión…',
  que_encontraron: 'Un ensayo con 67 niñas y niños…',
  en_ninas: 'Sin datos sobre niñas.',
  limitaciones: 'Un solo ensayo.',
  que_preguntar: ['¿Se usa en su colegio?'],
  relacionados: ['funciones-ejecutivas'],
  fuentes: ['kenworthy-2014'],
  revisado: '2026-11-20',
};

describe('esquema de los programas', () => {
  it('acepta un programa completo', () => {
    expect(valido(esquemaPrograma, programa)).toBe(true);
  });

  it('exige «En niñas», aunque sea para decir que no hay datos', () => {
    expect(valido(esquemaPrograma, { ...programa, en_ninas: ' ' })).toBe(false);
  });

  it('exige un peso de la lista', () => {
    expect(valido(esquemaPrograma, { ...programa, peso: 'demostrado' })).toBe(false);
  });

  it('exige al menos una ficha relacionada, una fuente y una pregunta', () => {
    expect(valido(esquemaPrograma, { ...programa, relacionados: [] })).toBe(false);
    expect(valido(esquemaPrograma, { ...programa, fuentes: [] })).toBe(false);
    expect(valido(esquemaPrograma, { ...programa, que_preguntar: [] })).toBe(false);
  });

  it('rechaza unas edades al revés o negativas', () => {
    expect(valido(esquemaPrograma, { ...programa, edad_desde: 11, edad_hasta: 8 })).toBe(false);
    expect(valido(esquemaPrograma, { ...programa, edad_desde: -1 })).toBe(false);
  });

  it('acepta el nombre original en inglés, si el título va traducido', () => {
    expect(
      valido(esquemaPrograma, { ...programa, nombre: 'Entrenamiento de la memoria de trabajo', en_ingles: 'Working memory training' }),
    ).toBe(true);
  });
});

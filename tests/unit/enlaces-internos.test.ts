import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';
import { expect, it } from 'vitest';
import { enlacesInternos } from '../../src/lib/enlazar';
import { ORDEN_ESCENAS } from '../../src/lib/tarjetas';

// Los enlaces a otras páginas que se escriben en los YAML: «[la ficha del masking](/glosario/masking/)».
// Esta prueba hace de red: que cada uno lleve a una página que existe, que vaya en un campo que la
// web pinta con enlaces y que esté en una sola línea del YAML (el script de legibilidad lo lee así).

const CONTENIDO = join(process.cwd(), 'src/content');
const PAGINAS = join(process.cwd(), 'src/pages');

const ids = (carpeta: string) =>
  readdirSync(join(CONTENIDO, carpeta))
    .filter((f) => /\.ya?ml$/.test(f))
    .map((f) => f.replace(/\.ya?ml$/, ''));

// Las páginas fijas salen de src/pages: «sobre.astro» es /sobre/ y «glosario/index.astro», /glosario/.
const paginasFijas = (carpeta: string): string[] =>
  readdirSync(carpeta, { withFileTypes: true }).flatMap((f) => {
    const ruta = join(carpeta, f.name);
    if (f.isDirectory()) return paginasFijas(ruta);
    if (!f.name.endsWith('.astro') || f.name.includes('[') || f.name === '404.astro') return [];
    const sinExtension = relative(PAGINAS, ruta).replace(/\\/g, '/').replace(/(^|\/)?index\.astro$/, '').replace(/\.astro$/, '');
    return [sinExtension ? `/${sinExtension}/` : '/'];
  });

const RUTAS = new Set([
  ...paginasFijas(PAGINAS),
  ...ids('glosario').map((id) => `/glosario/${id}/`),
  ...ids('mitos').map((id) => `/mitos/${id}/`),
  ...ids('herramientas').map((id) => `/diagnostico/${id}/`),
]);

// Las anclas a las que se puede enlazar. Si hace falta otra, se añade aquí.
const ordenesDePasos = ids('proceso').map((id) => parse(readFileSync(join(CONTENIDO, 'proceso', `${id}.yaml`), 'utf8')).orden);
const ANCLAS: Record<string, string[]> = {
  '/diagnostico/': ['colegio', 'criterios', 'que-mide', 'fuentes', ...ordenesDePasos.map((o) => `paso-${o}`)],
  '/escenas/': ORDEN_ESCENAS.map((id) => `escena-${id}`),
};

// Los campos que la web pinta con enlazarEntidades(). Los demás se usan también como texto plano
// (la descripción de la página, la primera frase en las tarjetas…), donde un enlace saldría tal cual.
const CAMPOS_CON_ENLACES: Record<string, string[]> = {
  glosario: ['como_se_ve', 'no_confundir_con', 'en_ninas', 'que_hacer'],
  mitos: ['por_que', 'de_donde_viene', 'que_hacer'],
  herramientas: ['que_mide', 'como_se_interpreta', 'limitaciones', 'en_ninas'],
  proceso: ['que_pasa', 'que_hacer', 'comunitat_valenciana.texto'],
  apartados: ['parrafos', 'que_hacer', 'comunitat_valenciana.parrafos'],
};

// Todos los textos de un YAML, con su campo («comunitat_valenciana.texto»; los índices de una lista no cuentan).
function textos(valor: unknown, campo = ''): { campo: string; texto: string }[] {
  if (typeof valor === 'string') return [{ campo, texto: valor }];
  if (Array.isArray(valor)) return valor.flatMap((v) => textos(v, campo));
  if (valor && typeof valor === 'object') {
    return Object.entries(valor).flatMap(([clave, v]) => textos(v, campo ? `${campo}.${clave}` : clave));
  }
  return [];
}

const enlaces = readdirSync(CONTENIDO, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    ids(d.name).flatMap((id) => {
      const fichero = `${d.name}/${id}.yaml`;
      const crudo = readFileSync(join(CONTENIDO, fichero), 'utf8');
      return textos(parse(crudo)).flatMap(({ campo, texto }) =>
        enlacesInternos(texto).map((e) => ({ ...e, fichero, coleccion: d.name, campo, crudo })),
      );
    }),
  );

it('hay enlaces internos en el contenido (si no, esta prueba no comprueba nada)', () => {
  expect(enlaces.length).toBeGreaterThan(0);
});

it('cada enlace interno lleva a una página que existe', () => {
  const rotos = enlaces.filter(({ href }) => {
    const [ruta, ancla] = href.split('#');
    return !RUTAS.has(ruta) || (ancla !== undefined && !ANCLAS[ruta]?.includes(ancla));
  });
  expect(rotos.map((e) => `${e.fichero}: ${e.href}`)).toEqual([]);
});

it('los enlaces internos solo van en campos que la web pinta con enlaces', () => {
  const fuera = enlaces.filter((e) => !CAMPOS_CON_ENLACES[e.coleccion]?.includes(e.campo));
  expect(fuera.map((e) => `${e.fichero}: ${e.campo}`)).toEqual([]);
});

it('cada enlace interno está en una sola línea del YAML', () => {
  const partidos = enlaces.filter((e) => !e.crudo.includes(`[${e.texto}](${e.href})`));
  expect(partidos.map((e) => `${e.fichero}: ${e.texto}`)).toEqual([]);
});

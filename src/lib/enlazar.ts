// Enlaza la primera mención de cada entidad en un texto, y los enlaces a otras páginas de la web.
// La ficha lo llama una vez por apartado, así que cada apartado enlaza su primera mención y se puede
// leer suelto: quien salta a «Qué podéis hacer» encuentra el enlace sin volver arriba. Devuelve
// trozos, no HTML: la página los pinta como texto o como <a>, y Astro escapa el texto.
export interface Entidad {
  nombres: string[];
  web: string;
  idioma: string;
}

export interface Trozo {
  texto: string;
  // Sin idioma, el enlace es a otra página de la web.
  enlace?: { href: string; idioma?: string };
}

// Un enlace a otra página de la web se escribe en el YAML como en Markdown, en una sola línea:
// «lo contamos en [la ficha del masking](/glosario/masking/)». Solo rutas internas, que empiezan
// por «/». Que la ruta exista, y que el campo admita enlaces, lo comprueba
// tests/unit/enlaces-internos.test.ts.
const ENLACE_INTERNO = /\[([^[\]]+)\]\((\/[^()\s]*)\)/g;

export function enlacesInternos(texto: string): { texto: string; href: string }[] {
  return [...texto.matchAll(ENLACE_INTERNO)].map((m) => ({ texto: m[1], href: m[2] }));
}

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Palabra entera, también con tildes (\b trata «ó» como separador). Distingue mayúsculas.
const patron = (e: Entidad) =>
  new RegExp(
    `(?<![\\p{L}\\p{N}])(?:${[...e.nombres].sort((a, b) => b.length - a.length).map(escapar).join('|')})(?![\\p{L}\\p{N}])`,
    'u',
  );

// Las entidades de un tramo sin enlaces internos. «yaEnlazadas» se comparte entre los tramos de un
// mismo texto, para que cada entidad se enlace una sola vez aunque haya un enlace interno en medio.
function enlazarTramo(tramo: string, entidades: Entidad[], yaEnlazadas: Set<Entidad>): Trozo[] {
  const trozos: Trozo[] = [];
  let resto = tramo;
  for (;;) {
    let mejor: { entidad: Entidad; inicio: number; nombre: string } | null = null;
    for (const entidad of entidades) {
      if (yaEnlazadas.has(entidad)) continue;
      const m = patron(entidad).exec(resto);
      if (!m) continue;
      if (!mejor || m.index < mejor.inicio || (m.index === mejor.inicio && m[0].length > mejor.nombre.length)) {
        mejor = { entidad, inicio: m.index, nombre: m[0] };
      }
    }
    if (!mejor) break;
    if (mejor.inicio > 0) trozos.push({ texto: resto.slice(0, mejor.inicio) });
    trozos.push({ texto: mejor.nombre, enlace: { href: mejor.entidad.web, idioma: mejor.entidad.idioma } });
    yaEnlazadas.add(mejor.entidad);
    resto = resto.slice(mejor.inicio + mejor.nombre.length);
  }
  if (resto) trozos.push({ texto: resto });
  return trozos;
}

// Dentro del texto de un enlace interno no se enlazan entidades: un enlace no va dentro de otro.
export function enlazarEntidades(texto: string, entidades: Entidad[]): Trozo[] {
  const yaEnlazadas = new Set<Entidad>();
  const trozos: Trozo[] = [];
  let desde = 0;
  for (const m of texto.matchAll(ENLACE_INTERNO)) {
    trozos.push(...enlazarTramo(texto.slice(desde, m.index), entidades, yaEnlazadas));
    trozos.push({ texto: m[1], enlace: { href: m[2] } });
    desde = m.index + m[0].length;
  }
  trozos.push(...enlazarTramo(texto.slice(desde), entidades, yaEnlazadas));
  return trozos;
}

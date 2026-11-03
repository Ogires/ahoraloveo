// Enlaza la primera mención de cada entidad en el texto de una ficha. Devuelve trozos,
// no HTML: la página los pinta como texto o como <a>, y Astro escapa el texto.
export interface Entidad {
  nombres: string[];
  web: string;
  idioma: string;
}

export interface Trozo {
  texto: string;
  enlace?: { href: string; idioma: string };
}

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Palabra entera, también con tildes (\b trata «ó» como separador). Distingue mayúsculas.
const patron = (e: Entidad) =>
  new RegExp(
    `(?<![\\p{L}\\p{N}])(?:${[...e.nombres].sort((a, b) => b.length - a.length).map(escapar).join('|')})(?![\\p{L}\\p{N}])`,
    'u',
  );

// `yaEnlazadas` se comparte entre los apartados de una ficha: así cada entidad se enlaza
// una sola vez en toda la ficha, en su primera mención.
export function enlazarEntidades(texto: string, entidades: Entidad[], yaEnlazadas: Set<Entidad>): Trozo[] {
  const trozos: Trozo[] = [];
  let resto = texto;
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

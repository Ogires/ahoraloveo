import type { TipoHerramienta } from './esquemas';

// Reglas para la etiqueta <meta name="robots">.
// Si la página no es indexable (p. ej. 404 o buscar), siempre lleva «noindex, follow», incluso con
// la web publicada. Mientras no esté publicada, las demás llevan «noindex, nofollow».
export function metaRobots(publicada: boolean, indexable: boolean): string | null {
  if (!indexable) return 'noindex, follow';
  if (!publicada) return 'noindex, nofollow';
  return null;
}

// Excluye del mapa del sitio las páginas que no deben indexarse o consolidan su canónica fuera.
const EXCLUIDAS_MAPA = new Set(['/buscar/', '/glosario/a-z/']);

export function incluirEnMapa(url: string): boolean {
  const { pathname } = new URL(url);
  const ruta = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return !EXCLUIDAS_MAPA.has(ruta);
}

// Títulos de las herramientas diagnósticas según su tipo: evita construcciones como «prueba de complementaria».
const TITULOS_HERRAMIENTA: Record<TipoHerramienta, (nombre: string) => string> = {
  cribado: (nombre) => `${nombre}: prueba de cribado del autismo`,
  diagnostico: (nombre) => `${nombre}: prueba de diagnóstico del autismo`,
  complementaria: (nombre) => `${nombre} en el diagnóstico del autismo`,
};

export function tituloHerramienta(nombre: string, tipo: TipoHerramienta): string {
  return TITULOS_HERRAMIENTA[tipo](nombre);
}

// Si «{término} ({otro nombre}) | {sitio}» supera los 65 caracteres, usa solo el término en el <title>.
export function tituloTermino(termino: string, otro: string, nombreSitio: string): string {
  const completo = `${termino} (${otro})`;
  return `${completo} | ${nombreSitio}`.length > 65 ? termino : completo;
}

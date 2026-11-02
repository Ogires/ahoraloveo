export type Tema = 'claro' | 'oscuro';

export const CLAVE_TEMA = 'tema';

export function temaGuardado(valor: string | null | undefined): Tema | null {
  return valor === 'claro' || valor === 'oscuro' ? valor : null;
}

export function temaEfectivo(guardado: Tema | null, sistemaOscuro: boolean): Tema {
  return guardado ?? (sistemaOscuro ? 'oscuro' : 'claro');
}

export function alternar(tema: Tema): Tema {
  return tema === 'oscuro' ? 'claro' : 'oscuro';
}

// Cada modo tiene su <meta name="theme-color"> (el color de la barra del móvil).
// Sin modo elegido, cada una vale con su preferencia del sistema; con uno elegido, solo la suya.
// public/tema.js aplica la misma regla antes de pintar.
export function mediaBarra(meta: Tema, elegido: Tema | null): string {
  if (!elegido) return `(prefers-color-scheme: ${meta === 'oscuro' ? 'dark' : 'light'})`;
  return meta === elegido ? 'all' : 'not all';
}

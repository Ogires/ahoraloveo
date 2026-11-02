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

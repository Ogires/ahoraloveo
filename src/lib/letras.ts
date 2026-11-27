// La letra con la que se agrupa un término en la vista de la A a la Z.
// Las tildes no cuentan («Ánimo» va con la A), pero la ñ es una letra propia, como en el diccionario.
export function letra(texto: string): string {
  const primera = texto.trim().charAt(0).toLocaleUpperCase('es');
  return primera === 'Ñ' ? 'Ñ' : primera.normalize('NFD').replace(/\p{M}/gu, '');
}

const orden = new Intl.Collator('es');

export function agruparPorLetra<T>(elementos: T[], nombre: (e: T) => string) {
  const ordenados = [...elementos].sort((a, b) => orden.compare(nombre(a), nombre(b)));
  const grupos: { letra: string; elementos: T[] }[] = [];
  for (const e of ordenados) {
    const l = letra(nombre(e));
    const ultimo = grupos.at(-1);
    if (ultimo?.letra === l) ultimo.elementos.push(e);
    else grupos.push({ letra: l, elementos: [e] });
  }
  return grupos;
}

export interface DatosTerminoAlfabetico {
  termino: string;
  en_espanol: string[];
  en_ingles?: string;
  alias: string[];
  alias_en_ingles: string[];
}

export type EntradaAlfabetica<T extends { id: string; data: DatosTerminoAlfabetico }> =
  | { tipo: 'termino'; clave: string; termino: T }
  | { tipo: 'remision'; clave: string; nombre: string; ingles: boolean; termino: T };

const capitalizar = (texto: string) => {
  const limpio = texto.trim();
  return limpio.charAt(0).toLocaleUpperCase('es') + limpio.slice(1);
};

// Entradas de la A a la Z: cada término en su letra más, como máximo, una remisión por letra para
// los otros nombres que empiecen por otra letra distinta del título (español antes que inglés).
export function entradasAlfabeticas<T extends { id: string; data: DatosTerminoAlfabetico }>(terminos: T[]) {
  const entradas: EntradaAlfabetica<T>[] = [];
  for (const t of terminos) {
    const d = t.data;
    entradas.push({ tipo: 'termino', clave: d.termino, termino: t });
    const vistas = new Set([letra(d.termino)]);
    const candidatos = [
      ...d.en_espanol.map((texto) => ({ texto, ingles: false })),
      ...d.alias.map((texto) => ({ texto, ingles: false })),
      ...(d.en_ingles ? [{ texto: d.en_ingles, ingles: true }] : []),
      ...d.alias_en_ingles.map((texto) => ({ texto, ingles: true })),
    ];
    for (const c of candidatos) {
      if (!c.texto.trim()) continue;
      const l = letra(c.texto);
      if (vistas.has(l)) continue;
      vistas.add(l);
      const nombre = capitalizar(c.texto);
      entradas.push({ tipo: 'remision', clave: nombre, nombre, ingles: c.ingles, termino: t });
    }
  }
  return agruparPorLetra(entradas, (e) => e.clave);
}

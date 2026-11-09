// Zod valida cada entrada por separado y no ve si dos comparten número: lo comprueba esta función.
// Ordena por el campo «orden» y para la compilación si dos entradas lo comparten.
export function ordenarPorNumero<T extends { id: string; data: { orden: number } }>(entradas: T[], que: string): T[] {
  const vistas = new Map<number, string>();
  for (const e of entradas) {
    const otra = vistas.get(e.data.orden);
    if (otra) throw new Error(`${que} «${otra}» y «${e.id}» tienen el mismo orden (${e.data.orden})`);
    vistas.set(e.data.orden, e.id);
  }
  return [...entradas].sort((a, b) => a.data.orden - b.data.orden);
}

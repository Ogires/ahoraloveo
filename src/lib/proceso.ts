// Zod valida cada paso por separado y no ve si dos comparten número: lo comprueba esta función.
// Ordena los pasos del proceso por su número y para la compilación si dos lo comparten.
export function ordenarPasos<T extends { id: string; data: { orden: number } }>(pasos: T[]): T[] {
  const vistos = new Map<number, string>();
  for (const p of pasos) {
    const otro = vistos.get(p.data.orden);
    if (otro) throw new Error(`Los pasos «${otro}» y «${p.id}» tienen el mismo orden (${p.data.orden})`);
    vistos.set(p.data.orden, p.id);
  }
  return [...pasos].sort((a, b) => a.data.orden - b.data.orden);
}

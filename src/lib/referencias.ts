// getEntries() devuelve undefined para las referencias rotas, sin fallar.
// Aquí sí fallamos, para que la compilación se pare.
export function exigirTodas<T>(entradas: (T | undefined)[], ids: string[], origen: string): T[] {
  const faltan = ids.filter((_, i) => entradas[i] === undefined);
  if (faltan.length > 0) {
    throw new Error(`${origen} enlaza a algo que no existe: ${faltan.join(', ')}`);
  }
  return entradas as T[];
}

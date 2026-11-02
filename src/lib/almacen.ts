// localStorage puede no existir o lanzar (modo privado, datos bloqueados).
// Nada de lo que se guarda aquí es imprescindible: si falla, la web sigue funcionando.
type Almacen = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function almacenDelNavegador(): Almacen | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function leer(clave: string, almacen: Almacen | null = almacenDelNavegador()): string | null {
  try {
    return almacen?.getItem(clave) ?? null;
  } catch {
    return null;
  }
}

export function guardar(
  clave: string,
  valor: string,
  almacen: Almacen | null = almacenDelNavegador(),
): boolean {
  if (!almacen) return false;
  try {
    almacen.setItem(clave, valor);
    return true;
  } catch {
    return false;
  }
}

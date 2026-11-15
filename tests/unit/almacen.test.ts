import { describe, expect, it } from 'vitest';
import { guardar, leer, quitar } from '../../src/lib/almacen';

function almacenFalso() {
  const datos = new Map<string, string>();
  return {
    getItem: (k: string) => datos.get(k) ?? null,
    setItem: (k: string, v: string) => void datos.set(k, v),
    removeItem: (k: string) => void datos.delete(k),
  };
}

const bloqueado = {
  getItem: (): string | null => { throw new Error('SecurityError'); },
  setItem: () => { throw new Error('QuotaExceededError'); },
  removeItem: () => { throw new Error('SecurityError'); },
};

describe('almacén', () => {
  it('guarda y lee un valor', () => {
    const almacen = almacenFalso();
    expect(guardar('tema', 'oscuro', almacen)).toBe(true);
    expect(leer('tema', almacen)).toBe('oscuro');
  });

  it('si el navegador bloquea el almacenamiento, leer devuelve null', () => {
    expect(leer('tema', bloqueado)).toBeNull();
  });

  it('si el navegador bloquea el almacenamiento, guardar devuelve false sin lanzar', () => {
    expect(guardar('tema', 'oscuro', bloqueado)).toBe(false);
  });

  it('sin almacenamiento disponible no falla', () => {
    expect(leer('tema', null)).toBeNull();
    expect(guardar('tema', 'oscuro', null)).toBe(false);
  });

  it('quita un valor guardado, y si el navegador lo bloquea devuelve false sin lanzar', () => {
    const almacen = almacenFalso();
    guardar('escenas-marcadas', '["meltdown-1"]', almacen);
    expect(quitar('escenas-marcadas', almacen)).toBe(true);
    expect(leer('escenas-marcadas', almacen)).toBeNull();
    expect(quitar('escenas-marcadas', bloqueado)).toBe(false);
    expect(quitar('escenas-marcadas', null)).toBe(false);
  });
});

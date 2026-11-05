import { describe, expect, it } from 'vitest';
import { ordenarPasos } from '../../src/lib/proceso';

const paso = (id: string, orden: number) => ({ id, data: { orden } });

describe('orden de los pasos', () => {
  it('los ordena por su número, no por el nombre del fichero', () => {
    expect(ordenarPasos([paso('b', 2), paso('c', 3), paso('a', 1)]).map((p) => p.id)).toEqual(['a', 'b', 'c']);
  });

  it('para la compilación si dos pasos tienen el mismo número', () => {
    expect(() => ordenarPasos([paso('cribado', 3), paso('derivacion', 3)])).toThrow('«cribado» y «derivacion»');
  });
});

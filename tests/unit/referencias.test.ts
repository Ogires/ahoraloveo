import { describe, expect, it } from 'vitest';
import { exigirTodas } from '../../src/lib/referencias';

describe('exigirTodas', () => {
  it('devuelve las entradas cuando existen todas', () => {
    expect(exigirTodas(['a', 'b'], ['fuentes/a', 'fuentes/b'], 'La ficha «crisis»')).toEqual(['a', 'b']);
  });

  it('lanza un error que dice qué falta y dónde', () => {
    expect(() =>
      exigirTodas(['a', undefined], ['fuentes/a', 'fuentes/no-existe'], 'La ficha «crisis»'),
    ).toThrow('La ficha «crisis» enlaza a algo que no existe: fuentes/no-existe');
  });
});

import { describe, expect, it } from 'vitest';
import { contraste } from '../../src/lib/contraste';

describe('contraste', () => {
  it('negro sobre blanco es 21:1', () => {
    expect(contraste('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
  });

  it('#767676 sobre blanco es el gris más claro que pasa AA', () => {
    expect(contraste('#767676', '#FFFFFF')).toBeCloseTo(4.54, 2);
  });

  it('no depende del orden', () => {
    expect(contraste('#4F46A5', '#FFFFFF')).toBe(contraste('#FFFFFF', '#4F46A5'));
  });

  it('rechaza lo que no es un color hexadecimal de 6 cifras', () => {
    expect(() => contraste('rojo', '#FFFFFF')).toThrow('Color no válido: rojo');
  });
});

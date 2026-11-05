import { describe, expect, it } from 'vitest';
import { formatearPorcentaje } from '../../src/lib/numeros';

describe('porcentajes', () => {
  it('usa la coma decimal, como se escribe en español', () => {
    expect(formatearPorcentaje(37.5)).toBe('37,5 %');
  });

  it('no añade decimales a un número entero', () => {
    expect(formatearPorcentaje(60)).toBe('60 %');
  });
});

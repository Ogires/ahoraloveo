import { describe, expect, it } from 'vitest';
import { ordenarPorNumero } from '../../src/lib/orden';

const entrada = (id: string, orden: number) => ({ id, data: { orden } });

describe('ordenar por número', () => {
  it('ordena por el campo «orden», no por el nombre del fichero', () => {
    const ordenadas = ordenarPorNumero([entrada('b', 2), entrada('a', 1)], 'Los mitos');
    expect(ordenadas.map((e) => e.id)).toEqual(['a', 'b']);
  });

  it('para la compilación si dos entradas comparten número, y dice de qué son', () => {
    expect(() => ordenarPorNumero([entrada('vacunas', 1), entrada('rabieta', 1)], 'Los mitos')).toThrow(
      'Los mitos «vacunas» y «rabieta» tienen el mismo orden (1)',
    );
  });
});

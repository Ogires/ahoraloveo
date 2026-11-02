import { describe, expect, it } from 'vitest';
import { segmentos } from '../../src/lib/rueda';

describe('segmentos de la rueda', () => {
  const partes = segmentos();

  it('hay seis, uno por familia', () => {
    expect(partes).toHaveLength(6);
  });

  it('el primero empieza arriba y gira en el sentido de las agujas del reloj', () => {
    expect(partes[0].d).toBe(
      'M183.6 10 A170 170 0 0 1 325.4 91.9 L258.7 132.3 A92 92 0 0 0 181.9 88 Z',
    );
  });

  it('la etiqueta queda en el centro del segmento', () => {
    expect(partes[0].etiqueta).toEqual({ x: 245.5, y: 66.6 });
    expect(partes[1].etiqueta).toEqual({ x: 311, y: 180 });
  });
});

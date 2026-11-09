import { describe, expect, it } from 'vitest';
import { mitosDe, ordenarMitos } from '../../src/lib/mitos';

const mito = (id: string, orden: number, relacionados: string[] = []) => ({
  id,
  data: { orden, relacionados: relacionados.map((r) => ({ collection: 'glosario', id: r })) },
});

describe('mitos', () => {
  it('se ordenan por su campo «orden» y paran la compilación si dos lo comparten', () => {
    expect(ordenarMitos([mito('b', 2), mito('a', 1)]).map((m) => m.id)).toEqual(['a', 'b']);
    expect(() => ordenarMitos([mito('a', 1), mito('b', 1)])).toThrow('Los mitos «a» y «b»');
  });

  it('una ficha del glosario recibe los mitos que la nombran en «relacionados», en orden', () => {
    const mitos = [mito('rabieta', 3, ['meltdown']), mito('calladas', 2, ['masking', 'meltdown']), mito('vacunas', 1)];
    expect(mitosDe('meltdown', mitos).map((m) => m.id)).toEqual(['calladas', 'rabieta']);
    expect(mitosDe('alexitimia', mitos)).toEqual([]);
  });
});

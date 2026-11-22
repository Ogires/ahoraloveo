import { describe, expect, it } from 'vitest';
import { programasDe, tramoDe } from '../../src/lib/programas';

type Peso = 'revisiones' | 'ensayo' | 'pequenos' | 'sin-estudios' | 'sin-beneficio';
const programa = (id: string, nombre: string, edad_desde: number, relacionados: string[], peso: Peso = 'ensayo') => ({
  id,
  data: { nombre, edad_desde, peso, relacionados: relacionados.map((r) => ({ collection: 'glosario', id: r })) },
});

describe('programas', () => {
  it('cada programa va en el tramo de la edad en que empieza', () => {
    expect(tramoDe(0).id).toBe('hasta-6');
    expect(tramoDe(5.5).id).toBe('hasta-6');
    expect(tramoDe(6).id).toBe('de-6-a-12');
    expect(tramoDe(11).id).toBe('de-6-a-12');
    expect(tramoDe(12).id).toBe('desde-12');
  });

  it('una ficha recibe solo sus programas, agrupados por tramos, sin los tramos vacíos', () => {
    const programas = [
      programa('a', 'Uno', 8, ['funciones-ejecutivas']),
      programa('b', 'Otro', 3, ['funciones-ejecutivas', 'rigidez-y-rutinas']),
      programa('c', 'Ajeno', 4, ['meltdown']),
    ];
    const grupos = programasDe('funciones-ejecutivas', programas);
    expect(grupos.map((g) => [g.id, g.programas.map((p) => p.id)])).toEqual([
      ['hasta-6', ['b']],
      ['de-6-a-12', ['a']],
    ]);
    expect(programasDe('alexitimia', programas)).toEqual([]);
  });

  it('dentro de un tramo, primero lo que tiene más pruebas a favor', () => {
    const programas = [
      programa('nulo', 'Alfa', 6, ['funciones-ejecutivas'], 'sin-beneficio'),
      programa('ensayo', 'Beta', 9, ['funciones-ejecutivas'], 'ensayo'),
      programa('revisiones', 'Gamma', 7, ['funciones-ejecutivas'], 'revisiones'),
    ];
    expect(programasDe('funciones-ejecutivas', programas)[0].programas.map((p) => p.id)).toEqual(['revisiones', 'ensayo', 'nulo']);
  });

  it('con el mismo peso, por la edad en que empiezan y, si coincide, por el nombre', () => {
    const programas = [
      programa('z', 'Zeta', 7, ['funciones-ejecutivas']),
      programa('b', 'Beta', 9, ['funciones-ejecutivas']),
      programa('a', 'Alfa', 7, ['funciones-ejecutivas']),
    ];
    expect(programasDe('funciones-ejecutivas', programas)[0].programas.map((p) => p.id)).toEqual(['a', 'z', 'b']);
  });
});

import { describe, expect, it } from 'vitest';
import { comprobarEscenarios, escenariosDe, problemasEscenarios } from '../../src/lib/elegir';

const refs = (...ids: string[]) => ids.map((id) => ({ id }));
const escenario = (id: string, terminos: string[], fuentes: string[]) => ({
  id,
  data: { terminos: refs(...terminos), fuentes: refs(...fuentes) },
});
const terminos = [
  { id: 'meltdown', data: { fuentes: refs('nas-crisis', 'paula'), no_confundir_con: 'Una rabieta.' } },
  { id: 'shutdown', data: { fuentes: refs('ambitious'), no_confundir_con: 'Con desobediencia.' } },
  { id: 'interocepcion', data: { fuentes: refs('khalsa') } },
];

describe('escenariosDe', () => {
  it('da las escenas de elegir de un término, en el orden de su id', () => {
    const escenarios = [
      escenario('crisis-o-rabieta-2', ['meltdown'], ['paula']),
      escenario('desconexion-1', ['shutdown'], ['ambitious']),
      escenario('crisis-o-rabieta-1', ['meltdown'], ['nas-crisis']),
    ];
    expect(escenariosDe('meltdown', escenarios).map((e) => e.id)).toEqual(['crisis-o-rabieta-1', 'crisis-o-rabieta-2']);
    expect(escenariosDe('masking', escenarios)).toEqual([]);
  });
});

describe('problemasEscenarios', () => {
  it('no ve problemas si las fuentes están en sus fichas', () => {
    expect(problemasEscenarios([escenario('a', ['meltdown', 'shutdown'], ['paula', 'ambitious'])], terminos)).toEqual([]);
  });

  it('avisa de una fuente que no está en sus fichas', () => {
    expect(problemasEscenarios([escenario('a', ['meltdown'], ['paula', 'ambitious'])], terminos)).toEqual([
      '«a» cita fuentes que no están en sus fichas: ambitious',
    ]);
  });

  it('avisa si la ficha no existe o no tiene «No confundir con», que es donde va', () => {
    expect(problemasEscenarios([escenario('a', ['no-existe', 'interocepcion'], ['khalsa'])], terminos)).toEqual([
      '«a» va en la ficha «no-existe», que no existe',
      '«a» va en la ficha «interocepcion», que no tiene «No confundir con»',
    ]);
  });

  it('comprobarEscenarios para la compilación con la lista de problemas', () => {
    expect(() => comprobarEscenarios([escenario('a', ['meltdown'], ['otra'])], terminos)).toThrow('«a» cita fuentes');
  });
});

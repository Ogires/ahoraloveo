import { describe, expect, it } from 'vitest';
import {
  idEscena,
  leerMarcadas,
  ordenarTarjetas,
  primeraFrase,
  terminosMarcados,
  textoProgreso,
} from '../../src/lib/tarjetas';

const termino = (id: string, escenas: number) => ({
  id,
  data: { escenas: Array.from({ length: escenas }, (_, i) => ({ texto: `${id} ${i + 1}` })) },
});

describe('ordenarTarjetas', () => {
  const terminos = [termino('meltdown', 2), termino('masking', 1)];
  const escenarios = [{ id: 'crisis-o-rabieta-1' }];
  const orden = ['masking-1', 'meltdown-2', 'elegir-crisis-o-rabieta-1', 'meltdown-1'];

  it('sigue el orden dado y llama a cada escena como su ilustración', () => {
    const tarjetas = ordenarTarjetas(terminos, escenarios, orden);
    expect(tarjetas.map((t) => t.id)).toEqual(orden);
    const segunda = tarjetas[1];
    expect(segunda.tipo === 'escena' && segunda.termino.id).toBe('meltdown');
    expect(segunda.tipo === 'escena' && segunda.escena).toEqual({ texto: 'meltdown 2' });
  });

  it('intercala las escenas de elegir, con su prefijo', () => {
    const tercera = ordenarTarjetas(terminos, escenarios, orden)[2];
    expect(tercera.tipo).toBe('elegir');
    expect(tercera.tipo === 'elegir' && tercera.escenario.id).toBe('crisis-o-rabieta-1');
  });

  it('para si falta una escena, si sobra o si se repite', () => {
    expect(() => ordenarTarjetas(terminos, escenarios, ['masking-1', 'meltdown-1', 'elegir-crisis-o-rabieta-1'])).toThrow('Faltan en el orden de las escenas: meltdown-2');
    expect(() => ordenarTarjetas(terminos, escenarios, ['masking-1', 'meltdown-1', 'meltdown-2'])).toThrow('Faltan en el orden de las escenas: elegir-crisis-o-rabieta-1');
    expect(() => ordenarTarjetas(terminos, escenarios, [...orden, 'meltdown-3'])).toThrow('«meltdown-3», que no existe');
    expect(() => ordenarTarjetas(terminos, escenarios, [...orden, 'masking-1'])).toThrow('«masking-1» está dos veces');
  });

  it('numera desde 1', () => {
    expect(idEscena('ecolalia', 0)).toBe('ecolalia-1');
  });
});

describe('primeraFrase', () => {
  it('corta en el primer punto que cierra frase', () => {
    expect(primeraFrase('La alexitimia es la dificultad para reconocer las emociones. Afecta a muchas personas.'))
      .toBe('La alexitimia es la dificultad para reconocer las emociones.');
  });

  it('junta las líneas del YAML y no corta en un punto de una cifra', () => {
    expect(primeraFrase('Dura 3 meses\n  o más, con 2.5 de media. Otra frase.')).toBe('Dura 3 meses o más, con 2.5 de media.');
  });

  it('respeta las comillas y las preguntas que abren la frase siguiente', () => {
    expect(primeraFrase('Se dice «crisis». ¿Por qué? Porque sí.')).toBe('Se dice «crisis».');
  });

  it('devuelve el texto entero si es una sola frase', () => {
    expect(primeraFrase('Una sola frase sin punto')).toBe('Una sola frase sin punto');
  });
});

describe('leerMarcadas', () => {
  const validas = ['a-1', 'b-1', 'c-1'];

  it('se queda con lo válido, sin repetidos y en el orden de las tarjetas', () => {
    expect(leerMarcadas('["c-1","a-1","c-1","ya-no-existe"]', validas)).toEqual(['a-1', 'c-1']);
  });

  it('no falla con lo guardado roto, vacío o de otro tipo', () => {
    expect(leerMarcadas(null, validas)).toEqual([]);
    expect(leerMarcadas('', validas)).toEqual([]);
    expect(leerMarcadas('{roto', validas)).toEqual([]);
    expect(leerMarcadas('{"a-1":true}', validas)).toEqual([]);
  });
});

describe('textoProgreso y terminosMarcados', () => {
  it('dice en qué escena estáis y cuántas habéis marcado', () => {
    expect(textoProgreso(3, 22, 5)).toBe('Escena 3 de 22 · Habéis marcado 5');
  });

  it('cuenta una vez el término de dos escenas marcadas', () => {
    const terminoDe = new Map([['meltdown-1', 'meltdown'], ['meltdown-2', 'meltdown'], ['masking-1', 'masking']]);
    expect([...terminosMarcados(['meltdown-1', 'meltdown-2'], terminoDe)]).toEqual(['meltdown']);
    expect(terminosMarcados(['no-existe'], terminoDe).size).toBe(0);
  });
});

import { describe, expect, it } from 'vitest';
import { contarPalabras, edadValida, revisarVariedad } from '../../src/lib/escenas';

const escena = (edad: string, lugar: string, protagonista: 'nina' | 'nino' = 'nina') => ({
  edad, lugar, protagonista, texto: 'Una escena corta.',
});

describe('escenas', () => {
  it('cuenta las palabras sin contar los espacios de más', () => {
    expect(contarPalabras('  Se tapa los oídos\n  y se va.  ')).toBe(7);
  });

  it.each(['18 meses', '1 año', '4 años', '12 años'])('acepta la edad «%s»', (edad) => {
    expect(edadValida(edad)).toBe(true);
  });

  it.each(['13 años', '40 meses', 'adolescente', '0 años', '4'])('rechaza la edad «%s»', (edad) => {
    expect(edadValida(edad)).toBe(false);
  });

  it('con menos de seis escenas no avisa: todavía no hay conjunto', () => {
    expect(revisarVariedad([escena('4 años', 'en casa'), escena('4 años', 'en casa')])).toEqual([]);
  });

  it('avisa si más de un tercio comparte edad o lugar', () => {
    const escenas = [
      escena('4 años', 'en casa'), escena('4 años', 'en el parque', 'nino'), escena('4 años', 'en el cole'),
      escena('7 años', 'en casa'), escena('9 años', 'en casa'), escena('2 años', 'en el coche'),
    ];
    const avisos = revisarVariedad(escenas);
    expect(avisos.some((a) => a.includes('«4 años»'))).toBe(true);
    expect(avisos.some((a) => a.includes('«en casa»'))).toBe(true);
  });

  it('avisa si ninguna escena tiene a un niño de protagonista', () => {
    const escenas = ['1 año', '3 años', '5 años', '7 años', '9 años', '11 años'].map((e, i) => escena(e, `lugar ${i}`));
    expect(revisarVariedad(escenas)).toEqual(['Ninguna escena tiene a un niño de protagonista']);
  });
});

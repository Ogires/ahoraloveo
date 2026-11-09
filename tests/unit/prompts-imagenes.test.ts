import { describe, expect, it } from 'vitest';
import { nombreFichero, promptEscena } from '../../src/lib/prompts-imagenes';

const escena = {
  termino: 'estereotipias',
  familia: { nombre: 'Sensorial', color: '#86C3C9' },
  n: 3,
  edad: '6 años',
  lugar: 'en la terraza de un bar',
  protagonista: 'nina' as const,
  texto: 'Mientras esperan la comida, se balancea en el banco y tararea bajito.',
};

describe('prompts de las ilustraciones', () => {
  it('el fichero se llama como la ficha y la posición de la escena', () => {
    expect(nombreFichero(escena)).toBe('estereotipias-3.png');
  });

  it('lleva el color de la familia, la edad, el sitio y el texto de la escena', () => {
    const p = promptEscena(escena);
    expect(p).toContain('#86C3C9');
    expect(p).toContain('una niña de 6 años, en la terraza de un bar');
    expect(p).toContain(escena.texto);
  });

  it('deja por decidir el aspecto y el momento, que se eligen mirando el conjunto', () => {
    expect(promptEscena(escena)).toContain('Aspecto: (por decidir)');
    expect(promptEscena(escena)).toContain('Momento a dibujar: (por decidir)');
  });

  it('en una crisis pide el momento de antes, nunca el más fuerte', () => {
    expect(promptEscena({ ...escena, termino: 'meltdown' })).toContain('el momento de antes');
    expect(promptEscena(escena)).not.toContain('el momento de antes');
  });

  it('con un niño, dice «un niño»', () => {
    expect(promptEscena({ ...escena, protagonista: 'nino' })).toContain('un niño de 6 años');
  });
});

import { describe, expect, it } from 'vitest';
import { otroNombre, tituloEnIngles } from '../../src/lib/terminos';

describe('nombres de un término', () => {
  it('con el título en inglés, el otro nombre es el primero en español', () => {
    const meltdown = { en_espanol: ['crisis', 'crisis por sobrecarga'] };
    expect(tituloEnIngles(meltdown)).toBe(true);
    expect(otroNombre(meltdown)).toEqual({ texto: 'crisis', lang: 'es' });
  });

  it('con el título en español, el otro nombre es el original en inglés', () => {
    const alexitimia = { en_ingles: 'alexithymia', en_espanol: [] };
    expect(tituloEnIngles(alexitimia)).toBe(false);
    expect(otroNombre(alexitimia)).toEqual({ texto: 'alexithymia', lang: 'en' });
  });
});

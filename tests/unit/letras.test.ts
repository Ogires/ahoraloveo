import { describe, expect, it } from 'vitest';
import { agruparPorLetra } from '../../src/lib/letras';

const t = (termino: string) => ({ termino });

describe('glosario de la A a la Z', () => {
  it('agrupa por la primera letra y ordena como en español', () => {
    const grupos = agruparPorLetra([t('Masking'), t('Ecolalia'), t('Alexitimia'), t('Estereotipias')], (x) => x.termino);
    expect(grupos.map((g) => g.letra)).toEqual(['A', 'E', 'M']);
    expect(grupos[1].elementos.map((x) => x.termino)).toEqual(['Ecolalia', 'Estereotipias']);
  });

  it('una tilde no crea una letra aparte', () => {
    const grupos = agruparPorLetra([t('Ánimo'), t('Alexitimia')], (x) => x.termino);
    expect(grupos.map((g) => g.letra)).toEqual(['A']);
  });

  it('la ñ es una letra propia, como en el diccionario', () => {
    const grupos = agruparPorLetra([t('Ñu'), t('Nube'), t('Oso')], (x) => x.termino);
    expect(grupos.map((g) => g.letra)).toEqual(['N', 'Ñ', 'O']);
  });
});

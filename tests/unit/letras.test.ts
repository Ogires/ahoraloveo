import { describe, expect, it } from 'vitest';
import { agruparPorLetra, entradasAlfabeticas } from '../../src/lib/letras';

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

describe('entradasAlfabeticas', () => {
  it('crea una sola remisión por letra y ficha, dando prioridad al español sobre el inglés', () => {
    const grupos = entradasAlfabeticas([
      {
        id: 'comorbilidad',
        data: {
          termino: 'Lo que puede acompañar al autismo',
          en_espanol: [],
          en_ingles: 'comorbidity',
          alias: ['comorbilidad', 'condiciones asociadas'],
          alias_en_ingles: ['co-occurring conditions'],
        },
      },
      {
        id: 'estereotipias',
        data: {
          termino: 'Estereotipias',
          en_espanol: [],
          en_ingles: 'stimming',
          alias: ['movimientos repetitivos'],
          alias_en_ingles: [],
        },
      },
    ]);

    const grupoC = grupos.find((g) => g.letra === 'C');
    expect(grupoC?.elementos).toHaveLength(1);
    expect(grupoC?.elementos[0]).toMatchObject({
      tipo: 'remision',
      nombre: 'Comorbilidad',
      ingles: false,
    });

    const grupoS = grupos.find((g) => g.letra === 'S');
    expect(grupoS?.elementos[0]).toMatchObject({
      tipo: 'remision',
      nombre: 'Stimming',
      ingles: true,
    });

    // No repite remisión en la letra del propio título.
    const grupoE = grupos.find((g) => g.letra === 'E');
    expect(grupoE?.elementos).toHaveLength(1);
    expect(grupoE?.elementos[0].tipo).toBe('termino');
  });
});

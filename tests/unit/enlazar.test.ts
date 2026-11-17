import { describe, expect, it } from 'vitest';
import { enlacesInternos, enlazarEntidades, type Entidad, type Trozo } from '../../src/lib/enlazar';

const aetapi: Entidad = { nombres: ['AETAPI'], web: 'https://aetapi.org/', idioma: 'es' };
const nas: Entidad = {
  nombres: ['National Autistic Society', 'NAS'],
  web: 'https://www.autism.org.uk/',
  idioma: 'en',
};
const madrid: Entidad = {
  nombres: ['Autismo Madrid', 'Federación Autismo Madrid'],
  web: 'https://autismomadrid.es/',
  idioma: 'es',
};

const enlazados = (trozos: Trozo[]) => trozos.filter((t) => t.enlace).map((t) => t.texto);
const unido = (trozos: Trozo[]) => trozos.map((t) => t.texto).join('');

describe('enlaces a las entidades', () => {
  it('enlaza la primera mención y deja las demás como texto', () => {
    const trozos = enlazarEntidades('AETAPI explica algo. Según AETAPI, más.', [aetapi]);
    expect(trozos).toEqual([
      { texto: 'AETAPI', enlace: { href: 'https://aetapi.org/', idioma: 'es' } },
      { texto: ' explica algo. Según AETAPI, más.' },
    ]);
  });

  it('no cambia ni una letra del texto', () => {
    const texto = 'Según AETAPI y la National Autistic Society, muchas niñas…';
    expect(unido(enlazarEntidades(texto, [aetapi, nas]))).toBe(texto);
  });

  it('cada llamada empieza de cero: cada apartado enlaza su primera mención', () => {
    expect(enlazados(enlazarEntidades('AETAPI dice.', [aetapi]))).toEqual(['AETAPI']);
    expect(enlazados(enlazarEntidades('AETAPI recomienda.', [aetapi]))).toEqual(['AETAPI']);
  });

  it('enlaza cada entidad una vez, en el orden en que aparecen', () => {
    const trozos = enlazarEntidades('La NAS y AETAPI. Otra vez AETAPI y la NAS.', [aetapi, nas]);
    expect(enlazados(trozos)).toEqual(['NAS', 'AETAPI']);
  });

  it.each(['AETAPIS', 'preAETAPI', 'AETAPIó', 'aetapi'])('no enlaza «%s»: no es la palabra exacta', (palabra) => {
    expect(enlazados(enlazarEntidades(`Dice ${palabra} algo.`, [aetapi]))).toEqual([]);
  });

  it('si un nombre contiene a otro, enlaza el completo', () => {
    const trozos = enlazarEntidades('Según la Federación Autismo Madrid.', [madrid]);
    expect(enlazados(trozos)).toEqual(['Federación Autismo Madrid']);
  });

  it('los puntos de un nombre son puntos, no comodines', () => {
    const ala: Entidad = { nombres: ['A.L.A.'], web: 'https://ejemplo.org/', idioma: 'es' };
    expect(enlazados(enlazarEntidades('AbLcAd y A.L.A. dicen.', [ala]))).toEqual(['A.L.A.']);
  });

  it('sin entidades en el texto, devuelve el texto entero', () => {
    expect(enlazarEntidades('Nada que enlazar.', [aetapi])).toEqual([{ texto: 'Nada que enlazar.' }]);
  });
});

describe('enlaces a otras páginas de la web', () => {
  it('convierte [texto](/ruta/) en un enlace sin idioma, y deja el resto como texto', () => {
    expect(enlazarEntidades('Lo contamos en [la ficha del masking](/glosario/masking/).', [])).toEqual([
      { texto: 'Lo contamos en ' },
      { texto: 'la ficha del masking', enlace: { href: '/glosario/masking/' } },
      { texto: '.' },
    ]);
  });

  it('enlaza las entidades de fuera, pero no las que van dentro del texto del enlace', () => {
    const trozos = enlazarEntidades('Según [lo que dice AETAPI](/mitos/ninas-calladas/), y AETAPI.', [aetapi]);
    expect(trozos.filter((t) => t.enlace).map((t) => t.enlace!.href)).toEqual(['/mitos/ninas-calladas/', 'https://aetapi.org/']);
  });

  it('con un enlace en medio, cada entidad se sigue enlazando una sola vez', () => {
    const trozos = enlazarEntidades('AETAPI, [una ficha](/glosario/masking/) y AETAPI otra vez.', [aetapi]);
    expect(enlazados(trozos)).toEqual(['AETAPI', 'una ficha']);
  });

  it.each(['[sin ruta]', '[externa](https://aetapi.org/)', '[rota](glosario/masking/)'])(
    'deja «%s» como texto: solo enlaza rutas que empiezan por «/»',
    (texto) => {
      expect(enlazarEntidades(texto, [])).toEqual([{ texto }]);
    },
  );

  it('enlacesInternos() lista los enlaces de un texto, para comprobarlos', () => {
    expect(enlacesInternos('En [alexitimia](/glosario/alexitimia/) y [doble empatía](/glosario/doble-empatia/).')).toEqual([
      { texto: 'alexitimia', href: '/glosario/alexitimia/' },
      { texto: 'doble empatía', href: '/glosario/doble-empatia/' },
    ]);
  });
});

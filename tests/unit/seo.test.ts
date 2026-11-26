import { describe, expect, it } from 'vitest';
import { incluirEnMapa, metaRobots, tituloHerramienta, tituloTermino } from '../../src/lib/seo';

describe('metaRobots', () => {
  it('devuelve noindex, follow para páginas no indexables incluso con la web publicada', () => {
    expect(metaRobots(false, false)).toBe('noindex, follow');
    expect(metaRobots(true, false)).toBe('noindex, follow');
  });

  it('devuelve noindex, nofollow en páginas indexables antes de publicar', () => {
    expect(metaRobots(false, true)).toBe('noindex, nofollow');
  });

  it('no devuelve etiqueta cuando la web está publicada y la página es indexable', () => {
    expect(metaRobots(true, true)).toBeNull();
  });
});

describe('incluirEnMapa', () => {
  it('excluye buscar y la vista A-Z del glosario', () => {
    expect(incluirEnMapa('https://ahoraloveo.es/buscar/')).toBe(false);
    expect(incluirEnMapa('https://ahoraloveo.es/buscar')).toBe(false);
    expect(incluirEnMapa('https://ahoraloveo.es/glosario/a-z/')).toBe(false);
    expect(incluirEnMapa('https://ahoraloveo.es/glosario/a-z')).toBe(false);
  });

  it('mantiene el resto de rutas públicas', () => {
    expect(incluirEnMapa('https://ahoraloveo.es/')).toBe(true);
    expect(incluirEnMapa('https://ahoraloveo.es/glosario/')).toBe(true);
    expect(incluirEnMapa('https://ahoraloveo.es/glosario/masking/')).toBe(true);
    expect(incluirEnMapa('https://ahoraloveo.es/diagnostico/ados-2/')).toBe(true);
  });
});

describe('tituloHerramienta', () => {
  it('adapta el texto al tipo de herramienta', () => {
    expect(tituloHerramienta('M-CHAT-R/F', 'cribado')).toBe('M-CHAT-R/F: prueba de cribado del autismo');
    expect(tituloHerramienta('ADOS-2', 'diagnostico')).toBe('ADOS-2: prueba de diagnóstico del autismo');
    expect(tituloHerramienta('Pruebas de desarrollo e inteligencia', 'complementaria')).toBe(
      'Pruebas de desarrollo e inteligencia en el diagnóstico del autismo',
    );
  });
});

describe('tituloTermino', () => {
  it('incluye el otro nombre cuando el título completo no supera 65 caracteres', () => {
    expect(tituloTermino('Masking', 'camuflaje', 'Ahora lo veo')).toBe('Masking (camuflaje)');
    expect(tituloTermino('Pensamiento dicotómico', 'dichotomous thinking', 'Ahora lo veo')).toBe(
      'Pensamiento dicotómico (dichotomous thinking)',
    );
  });

  it('deja solo el término cuando el título completo pasa de 65 caracteres', () => {
    expect(
      tituloTermino('Hiper e hiposensibilidad', 'sensory hypersensitivity and hyposensitivity', 'Ahora lo veo'),
    ).toBe('Hiper e hiposensibilidad');
  });
});

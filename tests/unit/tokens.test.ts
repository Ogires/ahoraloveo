import { describe, expect, it } from 'vitest';
import { contraste } from '../../src/lib/contraste';
import { CLARO, FAMILIAS, OSCURO, SOBRE_FAMILIA, cssDeTokens } from '../../src/lib/tokens';

const AA = 4.5;
const TEXTOS = ['tinta', 'tinta-suave', 'acento'] as const;

describe.each([
  ['claro', CLARO],
  ['oscuro', OSCURO],
] as const)('modo %s', (_, paleta) => {
  it.each(TEXTOS)('«%s» se lee sobre el fondo y sobre la superficie', (clave) => {
    expect(contraste(paleta[clave], paleta.fondo)).toBeGreaterThanOrEqual(AA);
    expect(contraste(paleta[clave], paleta.superficie)).toBeGreaterThanOrEqual(AA);
  });

  it('el texto de los botones se lee sobre el acento', () => {
    expect(contraste(paleta['sobre-acento'], paleta.acento)).toBeGreaterThanOrEqual(AA);
  });
});

describe('familias', () => {
  it('son las seis del diseño, en el orden de la rueda', () => {
    expect(FAMILIAS.map((f) => f.id)).toEqual([
      'sensorial', 'emociones', 'social', 'pensamiento', 'identidad', 'clinico',
    ]);
  });

  it.each(FAMILIAS.map((f) => [f.nombre, f.color]))('el texto se lee sobre %s', (_, color) => {
    expect(contraste(SOBRE_FAMILIA, color)).toBeGreaterThanOrEqual(AA);
  });
});

describe('cssDeTokens', () => {
  const css = cssDeTokens();

  it('define todos los colores en los dos modos', () => {
    for (const [clave, valor] of [...Object.entries(CLARO), ...Object.entries(OSCURO)]) {
      expect(css).toContain(`--${clave}:${valor};`);
    }
  });

  it('el modo elegido a mano manda sobre el del sistema', () => {
    expect(css).toContain(':root:not([data-tema="claro"])');
    expect(css).toContain(':root[data-tema="oscuro"]');
  });

  it('crea una clase por familia que fija --familia', () => {
    for (const f of FAMILIAS) expect(css).toContain(`.f-${f.id}{--familia:var(--${f.id})}`);
  });
});

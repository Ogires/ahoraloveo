import { describe, expect, it } from 'vitest';
import { alternar, mediaBarra, temaEfectivo, temaGuardado } from '../../src/lib/tema';

describe('tema', () => {
  it('solo acepta «claro» y «oscuro» como valor guardado', () => {
    expect(temaGuardado('oscuro')).toBe('oscuro');
    expect(temaGuardado('claro')).toBe('claro');
    expect(temaGuardado('azul')).toBeNull();
    expect(temaGuardado(null)).toBeNull();
    expect(temaGuardado(undefined)).toBeNull();
  });

  it('sin preferencia guardada sigue al sistema', () => {
    expect(temaEfectivo(null, true)).toBe('oscuro');
    expect(temaEfectivo(null, false)).toBe('claro');
  });

  it('la preferencia guardada manda sobre el sistema', () => {
    expect(temaEfectivo('claro', true)).toBe('claro');
  });

  it('alterna entre los dos', () => {
    expect(alternar('claro')).toBe('oscuro');
    expect(alternar('oscuro')).toBe('claro');
  });

  it('sin modo elegido, el color de la barra del móvil sigue al sistema', () => {
    expect(mediaBarra('claro', null)).toBe('(prefers-color-scheme: light)');
    expect(mediaBarra('oscuro', null)).toBe('(prefers-color-scheme: dark)');
  });

  it('con un modo elegido, solo vale el color de la barra de ese modo', () => {
    expect(mediaBarra('oscuro', 'oscuro')).toBe('all');
    expect(mediaBarra('claro', 'oscuro')).toBe('not all');
  });
});

import { describe, expect, it } from 'vitest';
import { analizar, prosa } from '../../.claude/skills/lenguaje-claro/scripts/legibilidad.mjs';

const larga = Array.from({ length: 32 }, (_, i) => `palabra${'s'.repeat(i % 2)}`).join(' ');

describe('legibilidad de una ficha en YAML', () => {
  it('una frase partida en varias líneas de un bloque «>» cuenta como una sola', () => {
    const ficha = 'que_es: >\n  Una frase partida\n  en dos líneas.\n';
    expect(analizar(ficha).frases).toBe(1);
  });

  it('ve las frases de más de 30 palabras aunque ocupen varias líneas', () => {
    const [primera, segunda] = [larga.split(' ').slice(0, 16), larga.split(' ').slice(16)];
    const ficha = `como_se_ve: >\n  ${primera.join(' ')}\n  ${segunda.join(' ')}.\n`;
    expect(analizar(ficha).frasesLargas).toHaveLength(1);
  });

  it('dentro de un bloque, una línea que empieza por «palabra:» sigue siendo prosa', () => {
    const ficha = 'como_se_ve: >\n  Muchas veces hay avisos\n  antes: va de un lado a otro.\n';
    expect(prosa(ficha)).toBe('Muchas veces hay avisos antes: va de un lado a otro.');
  });

  it('deja fuera los ids, las listas y las fechas', () => {
    const ficha = 'termino: Crisis\nalias: [meltdown]\nfuentes: [nas-crisis]\nrevisado: 2026-11-03\n';
    expect(analizar(ficha).palabras).toBe(0);
  });

  it('un bloque termina cuando vuelve una clave sin sangría', () => {
    const ficha = 'que_es: >\n  Primera frase\nen_ninas: >\n  Segunda frase\n';
    expect(analizar(ficha).frases).toBe(2);
  });

  it('avisa de una expresión partida entre dos líneas, con la línea donde empieza', () => {
    const ficha = 'que_hacer: >\n  Estas son las señales\n  de alarma.\n';
    const avisos = analizar(ficha).avisos;
    expect(avisos.map((a) => a.encontrado)).toEqual(['señales de alarma']);
    expect(avisos[0].linea).toBe(2);
  });
});

describe('legibilidad de un texto en Markdown', () => {
  it('un párrafo partido en varias líneas es un solo párrafo; el título va aparte', () => {
    const texto = '# Título\n\nUna frase\npartida en dos.\n';
    expect(analizar(texto).frases).toBe(2);
  });

  it('cada elemento de una lista va aparte', () => {
    expect(analizar('- El primer punto\n- El segundo punto\n').frases).toBe(2);
  });
});

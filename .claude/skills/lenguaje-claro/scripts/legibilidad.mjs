#!/usr/bin/env node
// Legibilidad de textos en español con el índice INFLESZ (Barrio-Cantalejo et al., 2008):
// fórmula de Szigriszt-Pazos con los tramos pensados para textos de salud.
// Además lista frases largas y palabras que la guía de estilo pide revisar.
//
// Uso: node legibilidad.mjs [--estricto] <fichero.md|.yaml|.txt> [...]
//      cat texto.txt | node legibilidad.mjs
// Con --estricto, termina con código 1 si hay frases largas, palabras marcadas o INFLESZ < 55.

import { readFileSync } from 'node:fs';

const FUERTES = 'aeoáéó';
const DEBILES_TILDE = 'íú';
const VOCALES = 'aeiouáéíóúü';
const MAX_PALABRAS_FRASE = 30;
const INFLESZ_MINIMO = 55;

// Límites de palabra que entienden de tildes (\b trata «ó» como separador).
const palabra = (patron) =>
  new RegExp(`(?<![\\p{L}\\p{N}])(?:${patron})(?![\\p{L}\\p{N}])`, 'giu');

const AVISOS = [
  [palabra('(?:sufr|padec)\\p{L}*'), '«sufre/padece»: presenta el autismo como un mal. Mejor «es autista».'],
  [palabra('enfermedad(?:es)?'), 'El autismo no es una enfermedad.'],
  [palabra('cura|curar|curarse|curación'), 'El autismo no se cura: di qué busca la terapia.'],
  [palabra('(?:alto|bajo) funcionamiento'), 'Mejor «necesidades de apoyo».'],
  [palabra('normal(?:es)?'), 'Revisa: si es el contrario de autista, «neurotípico»; si no, «habitual».'],
  [palabra('síntomas?'), 'Mejor «señales» o «rasgos» (una mención para SEO es aceptable).'],
  [palabra('déficits?'), 'Lenguaje de carencia: describe lo que pasa («le cuesta…»).'],
  [palabra('pacientes?'), 'Fuera de un contexto clínico, «niñas y niños» o «personas autistas».'],
  [palabra('padres'), '¿Genérico? Mejor «familias».'],
  [palabra('señal(?:es)? de alarma'), 'Asusta: «señales a tener en cuenta».'],
  [palabra('simplemente|basta con|solo (?:tienes|tenéis|hay) que'), 'Minimiza el esfuerzo de la familia.'],
  [palabra('luchas?|luchar|batallas?|guerrer[oa]s?|vencer|superar el autismo'), 'Metáfora de lucha o superación.'],
  [
    palabra('(?:los )?estudios (?:demuestran|prueban|confirman)|(?:demuestran|prueban|confirman) (?:los )?estudios|está (?:demostrado|probado)'),
    'Peso exagerado: di cuántos estudios y de qué tipo.',
  ],
  [palabra('neurodivers[oa]s?'), 'Revisa: una persona es «neurodivergente»; «neurodiverso» es un grupo.'],
  [palabra('asperger'), 'Ya no es un diagnóstico: úsalo solo para explicarlo.'],
  [palabra('autismo femenino'), 'Mejor «autismo en mujeres y niñas» o «presentación femenina» (una mención por página es aceptable).'],
  [/[¡!]/gu, 'Sin exclamaciones en el contenido.'],
];

export function silabas(token) {
  let p = token.toLowerCase().replace(/([qg])u([eéií])/g, '$1$2'); // u muda: que, qui, gue, gui
  // «y» es vocal al final de palabra o ante consonante (hoy, muy, y).
  p = p.replace(/y(?![aeiouáéíóú])/g, 'i');
  let total = 0;
  for (const grupo of p.match(/[aeiouáéíóúü]+/g) ?? []) {
    total += 1;
    for (let i = 1; i < grupo.length; i++) {
      const a = grupo[i - 1];
      const b = grupo[i];
      const hiato =
        (FUERTES.includes(a) && FUERTES.includes(b)) ||
        (DEBILES_TILDE.includes(a) && FUERTES.includes(b)) ||
        (FUERTES.includes(a) && DEBILES_TILDE.includes(b)) ||
        a === b;
      if (hiato) total += 1;
    }
  }
  return Math.max(total, 1);
}

// Deja solo la prosa: sin claves YAML, ids, URLs ni sintaxis Markdown.
export function prosa(texto) {
  return texto
    .split(/\r?\n/)
    .map((linea) => {
      if (/^\s*(---|```)/.test(linea)) return '';
      let l = linea.replace(/^\s*[\w-]+:\s*[>|]?-?\s*/, '');
      if (/^\[.*\]$/.test(l.trim()) || /^[\w./-]+$/.test(l.trim())) return '';
      return l
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/`[^`]*`/g, '')
        .replace(/^\s*(#+|>|[-*+]|\d+\.)\s*/, '')
        .replace(/[*_]/g, '');
    })
    .join('\n');
}

export function analizar(texto) {
  const limpio = prosa(texto);
  const frases = limpio
    .split(/\n|[.!?…]+(?=\s|$)/u)
    .map((f) => ({ texto: f.trim(), palabras: f.match(/\p{L}+/gu) ?? [] }))
    .filter((f) => f.palabras.length > 0);
  const palabras = frases.flatMap((f) => f.palabras);
  const nSilabas = palabras.reduce((suma, p) => suma + silabas(p), 0);
  const inflesz = palabras.length
    ? 206.835 - 62.3 * (nSilabas / palabras.length) - palabras.length / frases.length
    : null;

  const avisos = [];
  limpio.split('\n').forEach((linea, i) => {
    for (const [re, motivo] of AVISOS) {
      for (const m of linea.matchAll(re)) avisos.push({ linea: i + 1, encontrado: m[0], motivo });
    }
  });

  return {
    palabras: palabras.length,
    frases: frases.length,
    silabasPorPalabra: palabras.length ? nSilabas / palabras.length : 0,
    palabrasPorFrase: frases.length ? palabras.length / frases.length : 0,
    inflesz,
    frasesLargas: frases.filter((f) => f.palabras.length > MAX_PALABRAS_FRASE),
    avisos,
  };
}

export function tramo(inflesz) {
  if (inflesz < 40) return 'muy difícil';
  if (inflesz < 55) return 'algo difícil';
  if (inflesz < 65) return 'normal';
  if (inflesz <= 80) return 'bastante fácil';
  return 'muy fácil';
}

const num = (n) => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });

function informe(nombre, r) {
  const lineas = [nombre];
  if (r.inflesz === null) return [...lineas, '  (sin texto)'].join('\n');
  lineas.push(`  INFLESZ ${num(r.inflesz)} · ${tramo(r.inflesz)}  (objetivo ≥ 65; mínimo ${INFLESZ_MINIMO})`);
  lineas.push(
    `  ${r.palabras} palabras · ${r.frases} frases · ${num(r.palabrasPorFrase)} palabras/frase · ${num(r.silabasPorPalabra)} sílabas/palabra`,
  );
  if (r.frasesLargas.length) {
    lineas.push(`  Frases de más de ${MAX_PALABRAS_FRASE} palabras:`);
    for (const f of r.frasesLargas) {
      const corta = f.texto.length > 90 ? `${f.texto.slice(0, 90)}…` : f.texto;
      lineas.push(`    - «${corta}» (${f.palabras.length} palabras)`);
    }
  }
  if (r.avisos.length) {
    lineas.push('  Palabras a revisar:');
    for (const a of r.avisos) lineas.push(`    - l. ${a.linea}: «${a.encontrado}» → ${a.motivo}`);
  }
  return lineas.join('\n');
}

const esPrincipal = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop());
if (esPrincipal) {
  const args = process.argv.slice(2);
  const estricto = args.includes('--estricto');
  const ficheros = args.filter((a) => a !== '--estricto');
  const entradas = ficheros.length
    ? ficheros.map((f) => [f, readFileSync(f, 'utf8')])
    : [['(entrada estándar)', readFileSync(0, 'utf8')]];

  let problemas = 0;
  for (const [nombre, texto] of entradas) {
    const r = analizar(texto);
    console.log(informe(nombre, r));
    console.log();
    if (r.inflesz !== null && r.inflesz < INFLESZ_MINIMO) problemas++;
    problemas += r.frasesLargas.length + r.avisos.length;
  }
  if (estricto && problemas > 0) process.exit(1);
}

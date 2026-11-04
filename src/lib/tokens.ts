// Única fuente de los colores de la web (sección 8 del diseño).
// tokens.css se genera a partir de aquí y las pruebas comprueban el contraste.

export const IDS_FAMILIAS = [
  'sensorial', 'emociones', 'social', 'pensamiento', 'identidad', 'clinico',
] as const;
export type Familia = (typeof IDS_FAMILIAS)[number];

export const FAMILIAS: { id: Familia; nombre: string; color: string }[] = [
  { id: 'sensorial', nombre: 'Sensorial', color: '#86C3C9' },
  { id: 'emociones', nombre: 'Emociones', color: '#EBA3AE' },
  { id: 'social', nombre: 'Social', color: '#EDCB72' },
  { id: 'pensamiento', nombre: 'Pensamiento', color: '#A9A6E8' },
  { id: 'identidad', nombre: 'Identidad', color: '#95CDA0' },
  { id: 'clinico', nombre: 'Clínico', color: '#C4BDB2' },
];

// Sobre un color de familia, el texto siempre va en tinta oscura, en los dos modos.
export const SOBRE_FAMILIA = '#26223A';

interface Paleta {
  fondo: string;
  superficie: string;
  tinta: string;
  'tinta-suave': string;
  acento: string;
  'sobre-acento': string;
  linea: string;
  // Fondo de las palabras resaltadas en la búsqueda: el amarillo de «Social» mezclado con la superficie.
  resaltado: string;
}

export const CLARO: Paleta = {
  fondo: '#F4F3F9',
  superficie: '#FFFFFF',
  tinta: '#26223A',
  'tinta-suave': '#5A556F',
  acento: '#4F46A5',
  'sobre-acento': '#FFFFFF',
  linea: '#DEDBEA',
  resaltado: '#F5E2B1',
};

export const OSCURO: Paleta = {
  fondo: '#1A1827',
  superficie: '#242134',
  tinta: '#ECEAF6',
  'tinta-suave': '#ACA7C3',
  acento: '#B2ACF5',
  'sobre-acento': '#1A1827',
  linea: '#36324A',
  resaltado: '#605447',
};

const variables = (paleta: Paleta) =>
  Object.entries(paleta).map(([clave, valor]) => `--${clave}:${valor};`).join('');

export function cssDeTokens(): string {
  const familias =
    FAMILIAS.map((f) => `--${f.id}:${f.color};`).join('') + `--sobre-familia:${SOBRE_FAMILIA};`;
  // El modo oscuro solo en pantalla: al imprimir, el navegador quita los fondos y el texto claro
  // quedaría casi invisible sobre el papel.
  return [
    `:root{color-scheme:light;${variables(CLARO)}${familias}}`,
    `@media screen and (prefers-color-scheme:dark){:root:not([data-tema="claro"]){color-scheme:dark;${variables(OSCURO)}}}`,
    `@media screen{:root[data-tema="oscuro"]{color-scheme:dark;${variables(OSCURO)}}}`,
    ...FAMILIAS.map((f) => `.f-${f.id}{--familia:var(--${f.id})}`),
  ].join('\n');
}

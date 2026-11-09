// Prompts para generar con Gemini las ilustraciones de las escenas (guía en
// .claude/skills/lenguaje-claro/references/escenas.md, apartado «Ilustraciones»).
// Sin imports: el script de la skill lo carga con Node directamente.

export interface DatosEscena {
  termino: string; // id de la ficha, como «meltdown»
  familia: { nombre: string; color: string };
  n: number; // posición de la escena en su ficha, desde 1
  edad: string;
  lugar: string;
  protagonista: 'nina' | 'nino';
  texto: string;
}

// En una crisis se dibuja el momento de antes (norma 2 de las ilustraciones).
const CRISIS = ['meltdown', 'shutdown'];

const estilo = (familia: DatosEscena['familia']) =>
  [
    'Ilustración plana para una web de información para familias, como un álbum ilustrado sencillo.',
    'Formas redondeadas, trazos finos en color #26223A y textura suave. Nada realista ni fotográfico.',
    'Caras simples: ojos de punto y expresión tranquila.',
    `Color dominante: ${familia.color} (familia ${familia.nombre.toLowerCase()}), con acentos discretos en tonos pastel apagados.`,
    'Fondo claro y liso (#F4F3F9), con el sitio solo sugerido por dos o tres elementos.',
    'Formato horizontal 4:3. Una sola escena, sin viñetas, sin texto, letras, logos ni marcas.',
  ].join('\n');

export const nombreFichero = (e: Pick<DatosEscena, 'termino' | 'n'>) => `${e.termino}-${e.n}.png`;

export function promptEscena(e: DatosEscena): string {
  const quien = e.protagonista === 'nina' ? 'una niña' : 'un niño';
  const antes = CRISIS.includes(e.termino) ? 'el momento de antes de la crisis, nunca el más fuerte. ' : '';
  return [
    `## ${nombreFichero(e)}`,
    '',
    'Usa la imagen adjunta solo como referencia de estilo: el mismo trazo, la misma paleta y el mismo tipo de figura, con otra persona y otra escena.',
    '',
    estilo(e.familia),
    '',
    `Escena: ${quien} de ${e.edad}, ${e.lugar}. ${e.texto.trim()}`,
    '',
    'Aspecto: (por decidir)',
    `Momento a dibujar: ${antes}(por decidir)`,
    '',
    'Dibuja solo lo que cuenta la escena, sin gestos ni objetos de más. Los adultos, solo si salen en el texto, y en segundo plano. Nada de lágrimas exageradas ni gestos de sufrimiento.',
  ].join('\n');
}

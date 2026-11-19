// Las tarjetas «¿Lo habéis visto?» (/escenas/): primero la escena y, al girarla, lo que puede haber detrás.

// Cada escena se llama como su ilustración: el término y su número dentro de la ficha («meltdown-2»).
export const idEscena = (termino: string, indice: number) => `${termino}-${indice + 1}`;

// Las escenas de elegir van en el mismo orden, con este prefijo delante de su id.
export const PREFIJO_ELEGIR = 'elegir-';

// Orden fijo, elegido a mano (diseño, sección 5): alterna familias, empieza por situaciones frecuentes
// y poco duras y deja las más duras (el comedor, el burnout) para más adelante, sin acabar con ellas.
// De vez en cuando, una escena de elegir; la familia que cuenta es la de su primer término.
// Al añadir una escena a una ficha, o una escena de elegir, hay que ponerla aquí: si falta, la compilación para.
export const ORDEN_ESCENAS = [
  'estereotipias-2', // sensorial · 2 años · en el parque
  'intereses-especiales-2', // pensamiento · 8 años · a la salida del cole
  'ecolalia-1', // social · 4 años · en la consulta de pediatría
  'alexitimia-1', // emociones · 11 años · en el coche
  'hiper-e-hiposensibilidad-1', // sensorial · 5 años · en el patio del cole
  'elegir-crisis-o-rabieta-1', // emociones · 5 años · en el vestuario de la piscina
  'funciones-ejecutivas-1', // pensamiento · 4 años · en casa
  'teoria-de-la-mente-2', // social · 11 años · en el parque
  'elegir-interes-u-obsesion-1', // pensamiento · 6 años · en el salón de casa
  'meltdown-1', // emociones · 3 años · en casa de sus abuelos
  'estereotipias-1', // sensorial · 7 años · en clase
  'atencion-conjunta-1', // social · 16 meses · en el salón de casa
  'coherencia-central-1', // pensamiento · 6 años · al volver del zoo
  'elegir-crisis-o-rabieta-2', // emociones · 3 años · a la salida de la guardería
  'masking-1', // social · 10 años · en un cumpleaños
  'rigidez-y-rutinas-1', // pensamiento · 5 años · en su cuarto
  'shutdown-1', // emociones · 8 años · en la sala de espera del dentista
  'elegir-repite-o-quiere-decir-algo-1', // social · 5 años · en la cola de la panadería
  'hiper-e-hiposensibilidad-2', // sensorial · 10 años · en una tienda de ropa
  'intereses-especiales-1', // pensamiento · 7 años · en el coche
  'elegir-desconexion-o-no-hace-caso-1', // emociones · 7 años · en una zapatería
  'teoria-de-la-mente-1', // social · 5 años · en casa
  'meltdown-2', // emociones · 9 años · en el comedor del cole
  'atencion-conjunta-2', // social · 4 años · en la playa
  'estereotipias-3', // sensorial · 6 años · en la terraza de un bar
  'elegir-le-da-igual-o-no-sabe-que-siente-1', // emociones · 9 años · en la cocina
  'funciones-ejecutivas-2', // pensamiento · 9 años · en su cuarto
  'ecolalia-2', // social · 6 años · en el baño de casa
  'burnout-autista-1', // emociones · 12 años · en casa
  'elegir-camuflaje-o-timidez-1', // social · 8 años · en su primera clase de teatro
  'coherencia-central-2', // pensamiento · 10 años · en clase
  'doble-empatia-1', // social · 9 años · de camino a casa
  'rigidez-y-rutinas-2', // pensamiento · 8 años · en una cena en casa
] as const;

type ConEscenas = { id: string; data: { escenas: unknown[] } };

export type Tarjeta<T extends ConEscenas, E extends { id: string }> =
  | { tipo: 'escena'; id: string; termino: T; escena: T['data']['escenas'][number] }
  | { tipo: 'elegir'; id: string; escenario: E };

// Las escenas de todas las fichas y las escenas de elegir, en el orden de arriba. Para la compilación si
// el orden nombra una tarjeta que no existe, la repite o se deja alguna: así ninguna se queda fuera.
export function ordenarTarjetas<T extends ConEscenas, E extends { id: string }>(
  terminos: T[],
  escenarios: E[],
  orden: readonly string[] = ORDEN_ESCENAS,
): Tarjeta<T, E>[] {
  const todas = new Map<string, Tarjeta<T, E>>();
  for (const termino of terminos) {
    termino.data.escenas.forEach((escena, i) => {
      const id = idEscena(termino.id, i);
      todas.set(id, { tipo: 'escena', id, termino, escena });
    });
  }
  for (const escenario of escenarios) {
    const id = PREFIJO_ELEGIR + escenario.id;
    todas.set(id, { tipo: 'elegir', id, escenario });
  }
  const vistas = new Set<string>();
  for (const id of orden) {
    if (!todas.has(id)) throw new Error(`El orden de las escenas nombra «${id}», que no existe`);
    if (vistas.has(id)) throw new Error(`La escena «${id}» está dos veces en el orden`);
    vistas.add(id);
  }
  const faltan = [...todas.keys()].filter((id) => !vistas.has(id));
  if (faltan.length > 0) throw new Error(`Faltan en el orden de las escenas: ${faltan.join(', ')}`);
  return orden.map((id) => todas.get(id)!);
}

// La primera frase de «Qué es», para el reverso: corta en el primer punto (o cierre de pregunta o
// exclamación) seguido de un espacio y de algo que empieza frase.
export function primeraFrase(texto: string): string {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  const m = limpio.match(/^.*?[.!?](?=\s+[«"¿¡(\p{Lu}]|$)/u);
  return m ? m[0] : limpio;
}

// En el navegador solo se guardan los ids de las escenas marcadas.
export const CLAVE_MARCADAS = 'escenas-marcadas';

// Lo guardado puede venir roto o de otra versión de la web (una escena que ya no existe):
// se queda solo con lo válido, sin repetidos y en el orden de las tarjetas.
export function leerMarcadas(valor: string | null, validas: readonly string[]): string[] {
  if (!valor) return [];
  let datos: unknown;
  try {
    datos = JSON.parse(valor);
  } catch {
    return [];
  }
  if (!Array.isArray(datos)) return [];
  return validas.filter((id) => datos.includes(id));
}

export const textoProgreso = (actual: number, total: number, marcadas: number) =>
  `Escena ${actual} de ${total} · Habéis marcado ${marcadas}`;

// Los términos que hay detrás de las escenas marcadas: dos escenas del mismo término lo cuentan una vez.
export function terminosMarcados(marcadas: Iterable<string>, terminoDe: ReadonlyMap<string, string>): Set<string> {
  const terminos = new Set<string>();
  for (const id of marcadas) {
    const termino = terminoDe.get(id);
    if (termino) terminos.add(termino);
  }
  return terminos;
}

// Comprobaciones de las escenas del día a día (guía en .claude/skills/lenguaje-claro/references/escenas.md).

export interface Escena {
  edad: string;
  lugar: string;
  protagonista: 'nina' | 'nino';
  texto: string;
}

export const contarPalabras = (texto: string) => texto.trim().split(/\s+/).filter(Boolean).length;

// La web es para familias con hijas o hijos de 0 a 12 años: «18 meses», «1 año», «4 años»… hasta «12 años».
export function edadValida(edad: string): boolean {
  const m = edad.trim().match(/^(\d+) (mes|meses|año|años)$/);
  if (!m) return false;
  const n = Number(m[1]);
  return m[2].startsWith('mes') ? n >= 1 && n <= 36 : n >= 1 && n <= 12;
}

// La variedad se mira en el conjunto: con menos de seis escenas todavía no tiene sentido.
export function revisarVariedad(escenas: Escena[]): string[] {
  if (escenas.length < 6) return [];
  const avisos: string[] = [];
  for (const [campo, nombre] of [['edad', 'edad'], ['lugar', 'lugar']] as const) {
    const cuenta = new Map<string, number>();
    for (const e of escenas) {
      const valor = e[campo].trim().toLocaleLowerCase('es');
      cuenta.set(valor, (cuenta.get(valor) ?? 0) + 1);
    }
    for (const [valor, n] of cuenta) {
      if (n > escenas.length / 3) {
        avisos.push(`Más de un tercio de las escenas (${n} de ${escenas.length}) comparten ${nombre}: «${valor}»`);
      }
    }
  }
  if (!escenas.some((e) => e.protagonista === 'nino')) avisos.push('Ninguna escena tiene a un niño de protagonista');
  return avisos;
}

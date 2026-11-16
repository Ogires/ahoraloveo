// Las escenas de elegir («¿Crisis o rabieta?»): en qué fichas van y que no digan nada que sus fichas
// no digan ya con su fuente (guía en .claude/skills/lenguaje-claro/references/escenas-de-elegir.md).

type Ref = { id: string };
type Escenario = { id: string; data: { terminos: Ref[]; fuentes: Ref[] } };
type Termino = { id: string; data: { fuentes: Ref[]; no_confundir_con?: string } };

// Las escenas de elegir de un término, en el orden de su id.
export const escenariosDe = <E extends Escenario>(termino: string, escenarios: E[]): E[] =>
  escenarios
    .filter((e) => e.data.terminos.some((t) => t.id === termino))
    .sort((a, b) => a.id.localeCompare(b.id));

// Cada escena de elegir va debajo de «No confundir con» en la ficha de sus términos, así que esas fichas
// tienen que tenerlo. Y solo puede citar fuentes que ya estén en ellas.
export function problemasEscenarios(escenarios: Escenario[], terminos: Termino[]): string[] {
  const porId = new Map(terminos.map((t) => [t.id, t]));
  const problemas: string[] = [];
  for (const e of escenarios) {
    const permitidas = new Set<string>();
    for (const { id } of e.data.terminos) {
      const ficha = porId.get(id);
      if (!ficha) {
        problemas.push(`«${e.id}» va en la ficha «${id}», que no existe`);
        continue;
      }
      if (!ficha.data.no_confundir_con?.trim()) {
        problemas.push(`«${e.id}» va en la ficha «${id}», que no tiene «No confundir con»`);
      }
      ficha.data.fuentes.forEach((f) => permitidas.add(f.id));
    }
    const ajenas = e.data.fuentes.map((f) => f.id).filter((id) => !permitidas.has(id));
    if (ajenas.length > 0) {
      problemas.push(`«${e.id}» cita fuentes que no están en sus fichas: ${ajenas.join(', ')}`);
    }
  }
  return problemas;
}

export function comprobarEscenarios(escenarios: Escenario[], terminos: Termino[]): void {
  const problemas = problemasEscenarios(escenarios, terminos);
  if (problemas.length > 0) throw new Error(`Escenas de elegir:\n- ${problemas.join('\n- ')}`);
}

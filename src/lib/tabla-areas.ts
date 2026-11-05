import { AREAS, TIPOS_HERRAMIENTA, type Area, type TipoHerramienta } from './esquemas';

// La tabla «Qué mide cada herramienta» se genera desde las fichas: así no puede contradecirlas.
export const COLUMNAS = Object.keys(AREAS) as Area[];
const GRUPOS: Record<TipoHerramienta, string> = {
  cribado: 'Cribado',
  diagnostico: 'Diagnóstico',
  complementaria: 'Complementarias',
};

interface Herramienta {
  id: string;
  data: { nombre: string; tipo: TipoHerramienta; edades: string; areas: Area[] };
}

export function tablaAreas(herramientas: Herramienta[]) {
  return (Object.keys(TIPOS_HERRAMIENTA) as TipoHerramienta[])
    .map((tipo) => ({
      tipo,
      nombre: GRUPOS[tipo],
      filas: herramientas
        .filter((h) => h.data.tipo === tipo)
        .sort((a, b) => a.data.nombre.localeCompare(b.data.nombre, 'es'))
        .map((h) => ({
          id: h.id,
          nombre: h.data.nombre,
          edades: h.data.edades,
          mide: COLUMNAS.map((c) => h.data.areas.includes(c)),
        })),
    }))
    .filter((g) => g.filas.length > 0);
}

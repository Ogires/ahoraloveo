import { PESOS, type Peso } from './esquemas';

type Programa = { id: string; data: { nombre: string; edad_desde: number; peso: Peso; relacionados: { id: string }[] } };

// De más a menos peso, en el orden de la lista: primero lo que tiene más pruebas a favor.
const ORDEN_PESOS = Object.keys(PESOS) as Peso[];

// Los tramos de edad de «Programas estudiados» en la ficha. El último solo sale si tiene algo:
// la web es para familias de niñas y niños de 0 a 12 años.
export const TRAMOS = [
  { id: 'hasta-6', titulo: 'Hasta los 6 años', desde: 0, hasta: 6 },
  { id: 'de-6-a-12', titulo: 'De 6 a 12 años', desde: 6, hasta: 12 },
  { id: 'desde-12', titulo: 'A partir de 12 años', desde: 12, hasta: Infinity },
] as const;
export type Tramo = (typeof TRAMOS)[number];

// El tramo donde empieza un programa: uno de 4 a 8 años va en «Hasta los 6 años».
export const tramoDe = (edadDesde: number): Tramo =>
  TRAMOS.find((t) => edadDesde >= t.desde && edadDesde < t.hasta) ?? TRAMOS[0];

// Los programas que nombran un término en «relacionados», agrupados por tramos. Dentro de cada tramo, por el
// peso de las pruebas (de más a menos), por la edad en que empiezan y por el nombre. Así la ficha los
// muestra sin tener que poner el enlace inverso a mano.
export function programasDe<T extends Programa>(termino: string, programas: T[]): (Tramo & { programas: T[] })[] {
  const suyos = programas
    .filter((p) => p.data.relacionados.some((r) => r.id === termino))
    .sort(
      (a, b) =>
        ORDEN_PESOS.indexOf(a.data.peso) - ORDEN_PESOS.indexOf(b.data.peso) ||
        a.data.edad_desde - b.data.edad_desde ||
        a.data.nombre.localeCompare(b.data.nombre, 'es'),
    );
  return TRAMOS.map((t) => ({ ...t, programas: suyos.filter((p) => tramoDe(p.data.edad_desde).id === t.id) })).filter(
    (g) => g.programas.length > 0,
  );
}

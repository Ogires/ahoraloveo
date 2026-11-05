import { describe, expect, it } from 'vitest';
import type { Area, TipoHerramienta } from '../../src/lib/esquemas';
import { COLUMNAS, tablaAreas } from '../../src/lib/tabla-areas';

const h = (id: string, nombre: string, tipo: TipoHerramienta, areas: Area[]) => ({ id, data: { nombre, tipo, edades: 'x', areas } });

describe('tabla de áreas', () => {
  it('agrupa por tipo, en el orden cribado, diagnóstico y complementarias, y omite los grupos vacíos', () => {
    const grupos = tablaAreas([
      h('ados-2', 'ADOS-2', 'diagnostico', ['comunicacion-social']),
      h('scq', 'SCQ', 'cribado', ['comunicacion-social']),
    ]);
    expect(grupos.map((g) => g.nombre)).toEqual(['Cribado', 'Diagnóstico']);
  });

  it('marca cada columna según las áreas de la ficha', () => {
    const [grupo] = tablaAreas([h('pruebas', 'Pruebas de desarrollo', 'complementaria', ['desarrollo', 'vida-diaria'])]);
    expect(COLUMNAS).toEqual(['comunicacion-social', 'repetitivas-sensorial', 'desarrollo', 'vida-diaria']);
    expect(grupo.filas[0].mide).toEqual([false, false, true, true]);
  });

  it('ordena las filas de un grupo por nombre', () => {
    const [grupo] = tablaAreas([
      h('scq', 'SCQ', 'cribado', ['comunicacion-social']),
      h('cast', 'CAST', 'cribado', ['comunicacion-social']),
    ]);
    expect(grupo.filas.map((f) => f.id)).toEqual(['cast', 'scq']);
  });
});

// Rueda de las familias del glosario: anillo partido en segmentos iguales.
export interface Segmento {
  d: string;
  etiqueta: { x: number; y: number };
}

interface Opciones {
  centro?: number;
  exterior?: number;
  interior?: number;
  separacion?: number; // grados que se recortan en cada borde
  partes?: number;
}

const redondear = (n: number) => Math.round(n * 10) / 10;

function punto(centro: number, radio: number, grados: number): [number, number] {
  const a = (grados * Math.PI) / 180;
  return [redondear(centro + radio * Math.cos(a)), redondear(centro + radio * Math.sin(a))];
}

export function segmentos({
  centro = 180, exterior = 170, interior = 92, separacion = 1.2, partes = 6,
}: Opciones = {}): Segmento[] {
  const paso = 360 / partes;
  return Array.from({ length: partes }, (_, i) => {
    const desde = -90 + paso * i + separacion;
    const hasta = -90 + paso * (i + 1) - separacion;
    const [x0, y0] = punto(centro, exterior, desde);
    const [x1, y1] = punto(centro, exterior, hasta);
    const [x2, y2] = punto(centro, interior, hasta);
    const [x3, y3] = punto(centro, interior, desde);
    const [ex, ey] = punto(centro, (exterior + interior) / 2, -90 + paso * i + paso / 2);
    return {
      d: `M${x0} ${y0} A${exterior} ${exterior} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${interior} ${interior} 0 0 0 ${x3} ${y3} Z`,
      etiqueta: { x: ex, y: ey },
    };
  });
}

// Las fechas del YAML llegan como medianoche UTC: se formatean en UTC para no cambiar de día.
const formato = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

export const formatearFecha = (fecha: Date) => formato.format(fecha);

// Formato AAAA-MM-DD en UTC para el atributo datetime de <time>.
export const fechaIso = (fecha: Date) => fecha.toISOString().slice(0, 10);

// En la lista de fuentes: el año, o «sin fecha» con el día en que se consultó, como piden las normas de cita.
export const fechaDeFuente = (anio: number | 'sin fecha', comprobado: Date) =>
  anio === 'sin fecha' ? `sin fecha (consultada el ${formatearFecha(comprobado)})` : String(anio);

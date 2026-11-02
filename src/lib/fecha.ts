// Las fechas del YAML llegan como medianoche UTC: se formatean en UTC para no cambiar de día.
const formato = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

export const formatearFecha = (fecha: Date) => formato.format(fecha);

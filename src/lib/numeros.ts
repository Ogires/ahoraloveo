// Los números de la web se escriben como en español: coma decimal y espacio antes del «%».
const formato = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 });

export const formatearPorcentaje = (valor: number) => `${formato.format(valor)} %`;

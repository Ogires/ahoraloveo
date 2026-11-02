interface Datos {
  correo: string;
  pagina: string;
  url: string;
}

// encodeURIComponent codifica los espacios como %20 (URLSearchParams pondría +).
export function enlaceCorreccion({ correo, pagina, url }: Datos): string {
  const asunto = encodeURIComponent(`Corrección: ${pagina}`);
  const cuerpo = encodeURIComponent(`Página: ${url}\n\nQué está mal o desactualizado:\n`);
  return `mailto:${correo}?subject=${asunto}&body=${cuerpo}`;
}

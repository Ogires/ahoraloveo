// Worker de redirecciones: lleva a la web lo que llega por otras direcciones.
// - www.ahoraloveo.es, para quien escriba el www;
// - ahoraloveo.webninja.workers.dev, la dirección de antes del dominio, por si alguien la guardó.
// Se despliega aparte (redirecciones/wrangler.jsonc). Las páginas de la web no pasan por aquí:
// las sirve el Worker principal, que no ejecuta código.
import { SITIO } from '../src/config';

// Misma ruta y mismos parámetros en el dominio de la web. Se concatena en lugar de usar
// new URL(ruta, base): con una ruta como «//otra.com/», esa forma llevaría a otro dominio.
export function destino(url: string): string {
  const { pathname, search } = new URL(url);
  return SITIO.url + pathname + search;
}

export default {
  fetch(request: Request): Response {
    // 301: permanente, para que navegadores y buscadores se queden con la dirección nueva.
    return Response.redirect(destino(request.url), 301);
  },
};

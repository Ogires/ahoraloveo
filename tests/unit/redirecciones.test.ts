import { describe, expect, it } from 'vitest';
import redirecciones, { destino } from '../../redirecciones/index';
import { SITIO } from '../../src/config';

describe('redirecciones', () => {
  it('lleva el www a la web con la misma ruta y los mismos parámetros', () => {
    expect(destino('https://www.ahoraloveo.es/mitos/pantallas/?q=tablet')).toBe(
      `${SITIO.url}/mitos/pantallas/?q=tablet`,
    );
  });

  it('lleva la dirección de antes a la nueva', () => {
    expect(destino('https://ahoraloveo.webninja.workers.dev/glosario/masking/')).toBe(
      `${SITIO.url}/glosario/masking/`,
    );
  });

  it('no lleva a otro dominio aunque la ruta empiece por //', () => {
    const url = new URL(destino('https://www.ahoraloveo.es//ejemplo.com/x'));
    expect(url.origin).toBe(SITIO.url);
  });

  it('responde con una redirección permanente', () => {
    const respuesta = redirecciones.fetch(new Request('https://www.ahoraloveo.es/sobre/'));
    expect(respuesta.status).toBe(301);
    expect(respuesta.headers.get('Location')).toBe(`${SITIO.url}/sobre/`);
  });
});

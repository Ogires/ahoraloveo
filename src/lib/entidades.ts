import { getCollection } from 'astro:content';
import type { Entidad } from './enlazar';

// El registro de entidades, listo para enlazarEntidades(). Vive aparte de enlazar.ts
// porque astro:content solo existe dentro de Astro, y las pruebas de Vitest importan enlazar.ts.
export async function cargarEntidades(): Promise<Entidad[]> {
  return (await getCollection('entidades')).map((e) => ({
    nombres: [e.data.nombre, ...e.data.otros_nombres],
    web: e.data.web,
    idioma: e.data.idioma,
  }));
}

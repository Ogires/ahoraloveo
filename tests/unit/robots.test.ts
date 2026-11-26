import { expect, it } from 'vitest';
import { textoRobots } from '../../src/lib/robots';

it('deja rastrear siempre: si bloqueara la entrada, los buscadores no verían el noindex', () => {
  expect(textoRobots()).toMatch(/^User-agent: \*\nAllow: \/\n/);
  expect(textoRobots()).not.toMatch(/Disallow/);
});

it('dice dónde está el mapa del sitio, con la dirección completa', () => {
  expect(textoRobots()).toContain('Sitemap: https://ahoraloveo.es/sitemap-index.xml\n');
});

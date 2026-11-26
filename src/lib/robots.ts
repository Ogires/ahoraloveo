import { SITIO } from '../config';

// Siempre deja rastrear. Mientras la web no está publicada, lo que impide indexarla es el
// noindex de cada página: si robots.txt bloqueara la entrada, los buscadores no lo verían
// y podrían indexar la URL igualmente si alguien la enlaza.
// El mapa del sitio lo genera @astrojs/sitemap al construir (astro.config.ts).
export const textoRobots = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITIO.url}/sitemap-index.xml\n`;

// Siempre deja rastrear. Mientras la web no está publicada, lo que impide indexarla es el
// noindex de cada página: si robots.txt bloqueara la entrada, los buscadores no lo verían
// y podrían indexar la URL igualmente si alguien la enlaza.
export const textoRobots = () => 'User-agent: *\nAllow: /\n';

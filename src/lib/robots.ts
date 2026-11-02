export const textoRobots = (publicada: boolean) =>
  publicada ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n';

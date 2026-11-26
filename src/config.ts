// Datos del sitio. Nada de esto es secreto: todo acaba en el HTML.
export const SITIO = {
  nombre: 'Ahora lo veo', // candidato: faltan las marcas y la prueba con familias
  tema: 'Autismo en mujeres y niñas', // subtítulo: dice de qué va y es lo que se busca
  lema: 'Para cuando aparece la palabra «autismo»', // dice para quién es, no por qué se hace
  url: 'https://ahoraloveo.es', // sin barra final: redirecciones/index.ts le añade la ruta
  // Nombre real con enlace a su perfil (desde el 2026-11-26; antes, el seudónimo Ogires).
  autoria: 'Sergio Bonet',
  perfil: 'https://www.linkedin.com/in/sergio-bonet-plasencia-99427871/',
  // Buzón de OVH: se responde desde esta dirección, sin que se vea el correo personal.
  correo: 'hola@ahoraloveo.es',
  // Con false, cada página lleva noindex para que los buscadores no la indexen.
  publicada: false,
  // Token público de Cloudflare Web Analytics. Vacío: sin estadísticas.
  analytics: '',
} as const;

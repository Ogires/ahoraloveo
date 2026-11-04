// Datos del sitio. Nada de esto es secreto: todo acaba en el HTML.
export const SITIO = {
  nombre: 'Ahora lo veo', // candidato: faltan las marcas y la prueba con familias
  tema: 'Autismo en mujeres y niñas', // subtítulo: dice de qué va y es lo que se busca
  lema: 'Para cuando aparece la palabra «autismo»', // dice para quién es, no por qué se hace
  url: 'https://ahoraloveo.webninja.workers.dev',
  autoria: 'Ogires', // seudónimo (decisión 3)
  correo: 'contacto@ejemplo.org', // provisional: cambiar antes de desplegar
  // Con false, cada página lleva noindex para que los buscadores no la indexen.
  publicada: false,
  // Token público de Cloudflare Web Analytics. Vacío: sin estadísticas.
  analytics: '',
} as const;

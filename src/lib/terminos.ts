// El título de cada término es el nombre que más se usa en español al hablar de autismo, sea inglés
// («Meltdown») o español («Alexitimia»). Debajo y entre paréntesis va el otro nombre: el español si
// el título está en inglés, o el original en inglés si está en español. El esquema garantiza que hay
// uno de los dos.
interface Nombres {
  en_ingles?: string;
  en_espanol: string[];
}

export const tituloEnIngles = (t: Nombres) => t.en_ingles === undefined;

export const otroNombre = (t: Nombres): { texto: string; lang: 'es' | 'en' } =>
  t.en_ingles === undefined ? { texto: t.en_espanol[0], lang: 'es' } : { texto: t.en_ingles, lang: 'en' };

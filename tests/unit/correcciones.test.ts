import { expect, it } from 'vitest';
import { enlaceCorreccion } from '../../src/lib/correcciones';

const enlace = enlaceCorreccion({
  correo: 'hola@ejemplo.org',
  pagina: 'Crisis',
  url: 'https://ejemplo.org/glosario/crisis/',
});

it('abre un correo a la dirección de contacto', () => {
  expect(enlace.startsWith('mailto:hola@ejemplo.org?')).toBe(true);
});

it('lleva el asunto y la página ya indicados', () => {
  const datos = new URLSearchParams(enlace.split('?')[1]);
  expect(datos.get('subject')).toBe('Corrección: Crisis');
  expect(datos.get('body')).toContain('https://ejemplo.org/glosario/crisis/');
});

it('codifica los espacios como %20, porque algunos programas de correo muestran el +', () => {
  expect(enlace).not.toContain('+');
});

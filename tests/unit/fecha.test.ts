import { expect, it } from 'vitest';
import { fechaDeFuente, formatearFecha } from '../../src/lib/fecha';

it('escribe la fecha como se dice en español', () => {
  expect(formatearFecha(new Date('2026-10-30'))).toBe('30 de octubre de 2026');
});

it('no cambia de día por la zona horaria', () => {
  expect(formatearFecha(new Date('2026-01-01'))).toBe('1 de enero de 2026');
});

it('una fuente con año muestra solo el año', () => {
  expect(fechaDeFuente(2021, new Date('2026-11-05'))).toBe('2021');
});

it('una fuente sin fecha dice cuándo se consultó', () => {
  expect(fechaDeFuente('sin fecha', new Date('2026-11-05'))).toBe('sin fecha (consultada el 5 de noviembre de 2026)');
});

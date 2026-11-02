import { expect, it } from 'vitest';
import { formatearFecha } from '../../src/lib/fecha';

it('escribe la fecha como se dice en español', () => {
  expect(formatearFecha(new Date('2026-10-30'))).toBe('30 de octubre de 2026');
});

it('no cambia de día por la zona horaria', () => {
  expect(formatearFecha(new Date('2026-01-01'))).toBe('1 de enero de 2026');
});

import { expect, it } from 'vitest';
import { textoRobots } from '../../src/lib/robots';

it('mientras la web no está publicada, bloquea a todos los buscadores', () => {
  expect(textoRobots(false)).toBe('User-agent: *\nDisallow: /\n');
});

it('publicada, lo permite todo', () => {
  expect(textoRobots(true)).toBe('User-agent: *\nAllow: /\n');
});

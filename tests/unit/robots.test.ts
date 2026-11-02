import { expect, it } from 'vitest';
import { textoRobots } from '../../src/lib/robots';

it('deja rastrear siempre: si bloqueara la entrada, los buscadores no verían el noindex', () => {
  expect(textoRobots()).toBe('User-agent: *\nAllow: /\n');
});

import { expect, test } from '@playwright/test';

// Las cabeceras las pone Cloudflare a partir de public/_headers, y `astro preview` no las aplica.
// Se prueban contra Wrangler en local o contra la web publicada:
//   BASE_URL=http://localhost:8788 npm run test:e2e
test.skip(!process.env.BASE_URL, 'Solo con BASE_URL: astro preview no aplica public/_headers');

test('cada página lleva sus cabeceras de seguridad', async ({ request }) => {
  const cabeceras = (await request.get('/glosario/')).headers();
  expect(cabeceras['x-content-type-options']).toBe('nosniff');
  expect(cabeceras['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(cabeceras['permissions-policy']).toBe('camera=(), microphone=(), geolocation=(), payment=()');
  expect(cabeceras['content-security-policy']).toBe("frame-ancestors 'none'");
  expect(cabeceras['x-frame-options']).toBe('DENY');
  expect(cabeceras['strict-transport-security']).toBe('max-age=31536000');
});

test('los ficheros con hash en el nombre se guardan un año en caché', async ({ request }) => {
  const html = await (await request.get('/')).text();
  const css = html.match(/href="(\/_astro\/[^"]+\.css)"/)?.[1];
  expect(css).toBeDefined();
  expect((await request.get(css!)).headers()['cache-control']).toBe('public, max-age=31536000, immutable');
});

test('el fichero de cabeceras no se sirve', async ({ request }) => {
  expect((await request.get('/_headers')).status()).toBe(404);
});

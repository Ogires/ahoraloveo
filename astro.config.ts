import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { SITIO } from './src/config';

export default defineConfig({
  site: SITIO.url,
  // El mapa del sitio, para los buscadores. robots.txt dice dónde está.
  integrations: [sitemap()],
  // Shiki colorea el código con estilos en línea, que la CSP bloquea. No hay bloques de código.
  markdown: { syntaxHighlight: false },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://cloudflareinsights.com",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
      // Pagefind necesita WebAssembly. El beacon de Web Analytics viene de Cloudflare.
      scriptDirective: {
        resources: ["'self'", "'wasm-unsafe-eval'", 'https://static.cloudflareinsights.com'],
      },
      styleDirective: { resources: ["'self'"] },
    },
  },
});

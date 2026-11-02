import type { APIRoute } from 'astro';
import { SITIO } from '../config';
import { textoRobots } from '../lib/robots';

export const GET: APIRoute = () =>
  new Response(textoRobots(SITIO.publicada), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });

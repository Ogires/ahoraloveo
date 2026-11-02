import type { APIRoute } from 'astro';
import { textoRobots } from '../lib/robots';

export const GET: APIRoute = () =>
  new Response(textoRobots(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });

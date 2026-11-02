import type { APIRoute } from 'astro';
import { cssDeTokens } from '../lib/tokens';

export const GET: APIRoute = () =>
  new Response(cssDeTokens(), { headers: { 'Content-Type': 'text/css; charset=utf-8' } });

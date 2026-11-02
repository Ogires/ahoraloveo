import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Solo pruebas unitarias. Las de Playwright viven en tests/e2e.
    include: ['tests/unit/**/*.test.ts'],
    // Una zona con desfase negativo: aquí una fecha a medianoche UTC cae el día anterior.
    // En UTC (el CI) o en Madrid, un formato sin timeZone: 'UTC' pasaría las pruebas igual.
    env: { TZ: 'America/Bogota' },
  },
});

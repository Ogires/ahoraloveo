import { defineConfig } from 'vitest/config';

// Una zona con desfase negativo: aquí una fecha a medianoche UTC cae el día anterior.
// En UTC (el CI) o en Madrid, un formato sin timeZone: 'UTC' pasaría las pruebas igual.
process.env.TZ = 'America/Bogota';

export default defineConfig({
  // Solo pruebas unitarias. Las de Playwright viven en tests/e2e.
  test: { include: ['tests/unit/**/*.test.ts'] },
});

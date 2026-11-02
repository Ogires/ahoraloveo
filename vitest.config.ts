import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Solo pruebas unitarias. Las de Playwright viven en tests/e2e.
  test: { include: ['tests/unit/**/*.test.ts'] },
});

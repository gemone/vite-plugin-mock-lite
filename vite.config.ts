import { defineConfig } from 'vite';

import { resolve } from 'path';

module.exports = defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vite-plugin-mock-lite',
      fileName: (format) => `vite-plugin-mock-lite.${format}.js`,
    },
    rollupOptions: {
      external: ['fs'],
    },
  },
});

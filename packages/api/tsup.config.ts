import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
    compilerOptions: {
      rootDir: 'src',
      outDir: 'dist/types',
      declarationDir: 'dist/types'
    }
  },
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
});
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const terser = require('@rollup/plugin-terser');

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/ha-strategies.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({
      declaration: false,
      declarationMap: false,
      sourceMap: true
    }),
    terser({
      format: {
        comments: false
      }
    })
  ],
  external: ['lit']
};
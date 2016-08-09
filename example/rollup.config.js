// rollup.config.js
import typescript from 'rollup-plugin-typescript';

export default {
  entry: './src/index.ts',
  dest: './dist/build.js', 
  format: 'cjs',
  exports: 'named',
  plugins: [
    typescript()
  ]
}
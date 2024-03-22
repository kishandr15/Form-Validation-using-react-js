import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: '/src/main.jsx',
  output: {
    file: './build/bundle.min.js',
    format: 'iife',
    name: 'bundle'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser()
  ]
};

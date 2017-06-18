import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.es',
  plugins: [
    babel()
  ],
  targets: [
    {
      format: 'iife',
      dest: 'dist/animation.js',
      moduleName: 'Animation',
    },
    {
      format: 'cjs',
      dest: 'index.js',
    }
  ]
};

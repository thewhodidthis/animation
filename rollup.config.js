import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.es',
  plugins: [
    babel()
  ],
  targets: [
    {
      format: 'iife',
      moduleName: 'Animation',
      dest: 'dist/animation.js',
    },
    {
      format: 'cjs',
      dest: 'index.js',
    }
  ]
};

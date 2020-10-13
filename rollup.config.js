import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: './src/content/palette.ts',
    plugins: [typescript({ lib: ['es6', 'dom'], target: 'es6' })],
    output: {
      file: 'build/content.js',
      format: 'cjs',
    },
  },
  {
    input: './src/background/messaging.ts',
    plugins: [typescript({ lib: ['es6', 'dom'], target: 'es6' })],
    output: {
      file: 'build/background.js',
      format: 'cjs',
    },
  },
]

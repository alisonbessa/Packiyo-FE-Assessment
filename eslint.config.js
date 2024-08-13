import { ESLint } from 'eslint'

const eslintConfig = new ESLint({
  baseConfig: {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
  ignores: ['node_modules/', 'build/', 'public/build/'],
})

export default eslintConfig

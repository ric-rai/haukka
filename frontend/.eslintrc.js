module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-sequences': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-unknown-property': 'off',
    'no-restricted-globals': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
}

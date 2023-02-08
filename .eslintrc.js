module.exports = {
  extends: ['react-app', 'plugin:import/typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    'prettier/prettier': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
  },
};

module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  plugins: ['prettier'],
  rules: {
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

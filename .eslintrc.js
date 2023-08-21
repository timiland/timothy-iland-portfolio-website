/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: ['prettier', 'airbnb', 'airbnb-typescript-prettier'],
  rules: {
    'no-underscore-dangle': 'off',
    'react/button-has-type': 'off',
    'react/require-default-props': 'off',
    'react/no-danger': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-hooks/exhaustive-deps': ['warn'],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.mocks.ts',
          '**/*.stories.jsx',
          '**/*.stories.mdx',
          '**/*.stories.tsx',
          '**/*.test.tsx',
          '**/*.utils.ts',
          '**/*.utils.tsx',
        ],
      },
    ],
  },
};

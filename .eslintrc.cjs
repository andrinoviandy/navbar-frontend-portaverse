module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: [
    'react-refresh',
    'prettier',
    'simple-import-sort',
    'unused-imports',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',

    // Unused imports
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Sort Imports
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // ext library & side effect imports
          ['^@?\\w', '^\\u0000'],
          // {s}css files
          ['^.+\\.s?css$'],
          // Lib and hooks
          ['^@/lib', '^@/hooks'],
          // static data
          ['^@/data'],
          // components
          ['^@/components'],
          // Other imports
          ['^@/'],
          // relative paths up until 3 level
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^@/types'],
          // other that didnt fit in
          ['^'],
        ],
      },
    ],

    // suppress errors for forbid the use of extraneous packages
    'import/no-extraneous-dependencies': 'off',

    'import/no-absolute-path': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: [
          'snake_case',
          'UPPER_CASE',
          'camelCase',
          'PascalCase',
        ],
      },
    ],

    'import/extensions': 'off',
    'react/prop-types': 'off',

    // Mitigate CRLF & LF in unix & windows system
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};

'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: [
    'ember',
    'ember-suave'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'arrow-parens': 0,
    'ember-suave/no-const-outside-module-scope': 0,
    'ember/avoid-leaking-state-in-ember-objects': 0,
    'ember/use-brace-expansion': 0,
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'ember-suave/lines-between-object-properties': 0,
    'ember-suave/require-access-in-comments': 0,
    'ember/no-controller-access-in-routes': 1,
    'ember/no-classic-classes': 1,
    'ember/no-actions-hash': 1,
    'ember/classic-decorator-no-classic-methods': 1,
    'ember/require-tagless-components': 1,
    'ember/no-classic-components': 1,
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'no-multiple-empty-lines': [2, { 'max': 1, 'maxBOF': 0, 'maxEOF': 0 }],
    'padded-blocks': [2, 'never', { 'allowSingleLineBlocks': true }]
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2018
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        // this can be removed once the following is fixed
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off'
      }
    }
  ],
  globals: {
    'moment': true
  }
};

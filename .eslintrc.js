module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
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
    'ember/closure-actions': 1,
    'ember/no-observers': 1,
    'ember/no-new-mixins': 1,
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'ember-suave/lines-between-object-properties': 0,
    'ember-suave/require-access-in-comments': 0
  },
  globals: {
    'moment': true,
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
      }
    }
  ]
};

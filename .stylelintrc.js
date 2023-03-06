'use strict';

module.exports = {
  extends: [
    // Standard configuration
    'stylelint-config-standard',
    // Configuration based on https://sass-guidelin.es
    'stylelint-config-sass-guidelines',
    // Concentric order of declarations based on http://rhodesmill.org/brandon/2011/concentric-css/
    './.stylelintrc.order.js',
  ],
  rules: {
    'annotation-no-unknown': [true, { ignoreAnnotations: ['default'] }],
    'at-rule-no-unknown': null, // use scss/at-rule-no-unknown instead
    'import-notation': 'string',
    'max-nesting-depth': 3,
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': null,
    'scss/dollar-variable-colon-space-after': null,
    'selector-class-pattern': null,

    // All these disables are rules enabled by stylelint-config-sass-guidelines
    // that are deprecated in stylelint v15, remove these when
    // stylelint-config-sass-guidelines is upgraded to support v15.
    'block-opening-brace-space-before': null,
    'color-hex-case': null,
    'declaration-bang-space-after': null,
    'declaration-bang-space-before': null,
    'declaration-block-semicolon-newline-after': null,
    'declaration-block-semicolon-space-before': null,
    'declaration-block-trailing-semicolon': null,
    'declaration-colon-space-after': null,
    'declaration-colon-space-before': null,
    'function-comma-space-after': null,
    'function-parentheses-space-inside': null,
    indentation: null,
    'media-feature-parentheses-space-inside': null,
    'no-missing-end-of-source-newline': null,
    'number-leading-zero': null,
    'number-no-trailing-zeros': null,
    'selector-list-comma-newline-after': null,
    'string-quotes': null,
  },
};

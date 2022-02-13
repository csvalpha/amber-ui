'use strict';

module.exports = {
  "extends": [
    // Standard configuration
    "stylelint-config-standard",
    // Configuration based on https://sass-guidelin.es
    "stylelint-config-sass-guidelines",
    // Concentric order of declarations based on http://rhodesmill.org/brandon/2011/concentric-css/
    "./.stylelintrc.order.js"
  ],
  "rules": {
    "at-rule-no-unknown": null, // use scss/at-rule-no-unknown instead
    "no-descending-specificity": null,
    "number-leading-zero": "never",
    "max-nesting-depth": 3,
    "scss/at-rule-no-unknown": true,
    "scss/dollar-variable-colon-space-after": null,
    "selector-class-pattern": null
  }
};

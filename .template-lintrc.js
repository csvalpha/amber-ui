'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-bare-strings': false,
    'block-indentation': 2,
    'no-html-comments': true,
    'no-triple-curlies': true,
    'no-shadowed-elements': true,
    // TODO: activate those
    'no-implicit-this': false,
    'require-valid-alt-text': false,
    'table-groups': false,
    'no-action': false,
    'no-curly-component-invocation': false,
    'link-rel-noopener': false,
    'simple-unless': false,
    'link-href-attributes': false,
    'no-duplicate-attributes': false,
    'no-nested-interactive': false,
    'no-invalid-meta': false,
    'no-inline-styles': false,
    'no-invalid-interactive': false,
    'no-quoteless-attributes': false,
    'no-negated-condition': false,
    'no-unused-block-params': false,
    // We're using a few meta elements in the HTML body which is not allowed.
    // TODO: use ember-meta?
    'no-forbidden-elements': false,
  },
};

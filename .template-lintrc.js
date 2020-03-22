/* jshint node:true */
'use strict';

module.exports = {
  rules: {
    'no-bare-strings': false,
    'block-indentation': 2,
    'no-html-comments': true,
    'no-triple-curlies': true,
    'no-shadowed-elements': true,
    // TODO: activate those
    'no-implicit-this': false,
    'no-partial': false,
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
  },
  extends: 'octane'
};

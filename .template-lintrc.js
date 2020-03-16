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
    'table-groups': false
  },
  extends: 'octane'
};

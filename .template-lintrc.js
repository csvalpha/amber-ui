/* jshint node:true */
'use strict';

module.exports = {
  rules: {
    'bare-strings': ['(', ')', ',', '.', '&', '+', '-', '=', '*', '/', '#', '%', '!', '?', ':', '[', ']', '{', '}', '|',
      '±', '€', 'Bart', 'Suzanne', 'Andreas', 'Sara'],
    'block-indentation': 2,
    'html-comments': true,
    'triple-curlies': true
  }
};

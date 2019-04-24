import $ from 'jquery';
import { registerHelper } from '@ember/test';
import QUnit from 'qunit';

const mergeUnique = function() {
  return $.unique($.merge(...arguments));
};

const withValue = function(text, scope) {
  return find(`${scope || ''}[value*="${text}"]`);
};

const directlyContains = function(text, scope) {
  const foundText = find(`${scope || ''}:contains(${text})`).filter(function() {
    return (
    $(this).clone() // Clone the element
      .children() // Select all the children
      .remove() // Remove all the children
      .end() // Again go back to selected element
      .filter(`:contains(${text})`).length > 0);
  });
  const foundValue = withValue(text, scope);
  return mergeUnique(foundText, foundValue);
};

const textHelpers = (function() {
  registerHelper('button', (app, text) => {
    return mergeUnique(
      withValue(text, 'input'),
      directlyContains(text, 'button'));
  });

  registerHelper('text', (app, text) => {
    return directlyContains(text);
  });

  QUnit.assert.hasText = function(text, message) {
    const element = directlyContains(text);
    QUnit.assert.ok(element.length, message || `Could not find text "${text}" on the page`);
  };
})();

export default textHelpers;

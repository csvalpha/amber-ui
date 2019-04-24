import { module, test } from 'ember-qunit';
import translationsNl from 'alpha-amber/locales/nl/translations';
import translationsEn from 'alpha-amber/locales/en/translations';

module('locales', () => {
  test('locales share the same property keys', assert => {
    compareObjectKeysRecursive(translationsNl, translationsEn, assert);
  });
});

/** Method to recursively compare keys of an object and nested properties which are an object */
function compareObjectKeysRecursive(first, second, assert, path = '') {
  const keys = Object.keys(first);
  assert.deepEqual(keys, Object.keys(second), `it contains the same object keys in ${path}`);
  keys.forEach(key => {
    if (typeof first[key] === 'object' || typeof second[key] === 'object') {
      compareObjectKeysRecursive(first[key], second[key], assert, `${path}.${key}`);
    }
  });
}

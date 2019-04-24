import { isArray } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('itShouldHaveEqualAttributes', (app, assert, model, expectedValues, attributeNames = null) => {
  attributeNames = attributeNames || Object.keys(expectedValues);

  attributeNames.forEach(attribute => {
    const expected = expectedValues[attribute];
    const actual = model[attribute];

    if (isArray(actual) || isArray(expected)) {
      assert.ok((isEmpty(actual) && isEmpty(expected)) || actual === expected, `The array attribute '${attribute}' should be as expected'`);
    } else if (actual instanceof Date || expected instanceof Date) {
      assert.equal(
        moment(actual).format('YYYY-MM-DD'),
        moment(expected).format('YYYY-MM-DD'),
        `The date attribute '${attribute}' should be as expected'`
      );
    } else {
      assert.equal(actual, expected, `The attribute '${attribute}' should be as expected`);
    }
  });
});

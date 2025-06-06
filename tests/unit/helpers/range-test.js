import { range } from 'amber-ui/helpers/range';
import { module, test } from 'qunit';

module('Unit | Helper | range', function () {
  const correctRange = [0, 1, 2, 3];

  test('it returns an array with the correct range', function (assert) {
    assert.notDeepEqual(range([0, 3]), correctRange);
    assert.deepEqual(range([0, 4]), correctRange);
  });
});

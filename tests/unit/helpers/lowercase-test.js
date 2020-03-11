import { lowercase } from 'alpha-amber/helpers/lowercase';
import { module, test } from 'qunit';

module('Unit | Helper | lowercase', function() {
  test('it converts the given value to lowercase', (assert) => {
    assert.equal(lowercase(['Test']), 'test');
    assert.equal(lowercase(['Test Test']), 'test test');
    assert.equal(lowercase(['123']), '123');
    assert.equal(lowercase(['Opent over 3 dagen']), 'opent over 3 dagen');
  });
});


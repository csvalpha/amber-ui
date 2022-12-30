import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | books/book/destroy', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:books/book/destroy');
    assert.ok(route);
  });
});

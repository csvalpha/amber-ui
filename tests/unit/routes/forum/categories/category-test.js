import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | forum/categories/category', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:forum/categories/category');
    assert.ok(route);
  });
});

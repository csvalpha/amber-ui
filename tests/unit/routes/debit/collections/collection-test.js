import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | debit/collections/collection', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:debit/collections/collection');
    assert.ok(route);
  });
});

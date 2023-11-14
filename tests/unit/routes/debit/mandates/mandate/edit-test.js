import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | debit/mandates/mandate/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:debit/mandates/mandate/edit');
    assert.ok(route);
  });
});

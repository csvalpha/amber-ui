import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:users/edit');
    assert.ok(route);
  });
});

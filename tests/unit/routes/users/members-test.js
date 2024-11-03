import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/members', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:users/members');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/user/edit/permissions', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:users/user/edit/permissions');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/batch/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:users/batch/new');
    assert.ok(route);
  });
});

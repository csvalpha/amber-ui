import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/webdav', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:users/webdav');
    assert.ok(route);
  });
});

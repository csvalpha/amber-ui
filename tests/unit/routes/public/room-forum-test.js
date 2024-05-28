import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | public/room-forum', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:public/room-forum');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | room-advert', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:room-advert');
    assert.ok(route);
  });
});

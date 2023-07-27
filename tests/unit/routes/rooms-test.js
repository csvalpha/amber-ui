import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | rooms', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:rooms');
    assert.ok(route);
  });
});

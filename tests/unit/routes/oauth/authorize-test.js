import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | oauth/authorize', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:oauth/authorize');
    assert.ok(route);
  });
});

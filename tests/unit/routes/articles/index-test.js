import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | articles/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:articles/index');
    assert.ok(route);
  });
});

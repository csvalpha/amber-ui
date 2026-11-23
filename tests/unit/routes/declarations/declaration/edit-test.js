import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | declarations/declaration/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:declarations/declaration/edit');
    assert.ok(route);
  });
});

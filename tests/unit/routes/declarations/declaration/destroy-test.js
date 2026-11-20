import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | declarations/declaration/destroy', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:declarations/declaration/destroy');
    assert.ok(route);
  });
});

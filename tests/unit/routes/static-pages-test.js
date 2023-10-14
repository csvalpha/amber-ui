import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | static-pages', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:static-pages');
    assert.ok(route);
  });
});

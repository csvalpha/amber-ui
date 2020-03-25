import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | sog/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:sog/index');
    assert.ok(route);
  });
});

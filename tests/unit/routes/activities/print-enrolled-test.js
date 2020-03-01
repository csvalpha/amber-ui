import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | activities/print_enrolled', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:activities/print_enrolled');
    assert.ok(route);
  });
});


import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | polls/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:polls/edit');
    assert.ok(route);
  });

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:polls/edit');
    assert.ok(route);
  });
});

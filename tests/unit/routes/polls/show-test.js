import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | polls/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:polls/show');
    assert.ok(route);
  });

  test('it has a correct modelName', function(assert) {
    const route = this.owner.lookup('route:polls/show');

    assert.equal('poll', route.get('modelName'));
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | polls/destroy', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:polls/destroy');
    assert.ok(route);
  });

  test('it has a correct modelName', function(assert) {
    const route = this.owner.lookup('route:polls/destroy');

    assert.equal('poll', route.get('modelName'));
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | polls/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:polls/index');
    assert.ok(route);
  });

  test('it has a correct modelName', function(assert) {
    const route = this.owner.lookup('route:polls/index');

    assert.equal('poll', route.get('modelName'));
  });
});

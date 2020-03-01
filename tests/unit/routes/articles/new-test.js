import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | articles/new', function(hooks) {
  setupTest(hooks);

  test('it has a correct modelName', function(assert) {
    const route = this.owner.lookup('route:articles/new');

    assert.equal('article', route.get('modelName'));
  });
});

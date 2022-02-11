import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Ability | sog/chess', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const ability = this.owner.lookup('ability:sog/chess');
    assert.ok(ability);
  });
});

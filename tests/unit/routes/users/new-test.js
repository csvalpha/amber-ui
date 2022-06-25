import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import itShouldRemoveNewModel from 'amber-ui/tests/helpers/unit/it-should-remove-new-model';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Route | users/new', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:users/new');
    assert.ok(route);
  });

  test('model is removed on deactivation', function (assert) {
    assert.expect(1);
    itShouldRemoveNewModel(
      assert,
      this.owner.lookup('route:users/new'),
      'user'
    );
  });
});

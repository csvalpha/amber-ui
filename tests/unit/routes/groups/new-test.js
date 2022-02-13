import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import startApp from 'alpha-amber/tests/helpers/start-app';
import destroyApp from 'alpha-amber/tests/helpers/destroy-app';
import itShouldRemoveRelationship from 'alpha-amber/tests/helpers/unit/it-should-remove-relationship';
import itShouldRemoveNewModel from 'alpha-amber/tests/helpers/unit/it-should-remove-new-model';

let App;

module('Unit | Route | groups/new', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    App = startApp();
  });

  hooks.afterEach(function() {
    destroyApp(App);
  });

  test('model is removed on deactivation', function(assert) {
    assert.expect(1);
    itShouldRemoveNewModel(assert, this.owner.lookup('route:groups/new'), 'group');
  });

  test('memberships are removed on deactivation', function(assert) {
    assert.expect(1);
    const relationshipType = 'membership';
    const relationshipName = 'memberships';
    itShouldRemoveRelationship(assert, this.owner.lookup('route:groups/new'), relationshipName, relationshipType);
  });
});

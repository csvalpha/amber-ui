import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

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
    itShouldRemoveNewModel(assert, this.owner.lookup('route:groups/new'), 'group');
  });

  test('memberships are removed on deactivation', function(assert) {
    const relationshipType = 'membership';
    const relationshipName = 'memberships';

    itShouldRemoveRelationship(assert, this.owner.lookup('route:groups/new'), relationshipName, relationshipType);
  });
});

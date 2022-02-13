import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import startApp from 'alpha-amber/tests/helpers/start-app';
import destroyApp from 'alpha-amber/tests/helpers/destroy-app';
import itShouldRemoveNewModel from 'alpha-amber/tests/helpers/unit/it-should-remove-new-model';

let App;

module('Unit | Route | users/new', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    App = startApp();
  });

  hooks.afterEach(function() {
    destroyApp(App);
  });

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:users/new');
    assert.ok(route);
  });

  test('model is removed on deactivation', function(assert) {
    assert.expect(1);
    itShouldRemoveNewModel(assert, this.owner.lookup('route:users/new'), 'user');
  });
});

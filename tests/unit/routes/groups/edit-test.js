import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

let App;

module('Unit | Route | groups/edit', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    App = startApp();
  });

  hooks.afterEach(function() {
    destroyApp(App);
  });

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:groups/edit');
    assert.ok(route);
  });

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:groups/edit');
    assert.ok(route);
  });
});

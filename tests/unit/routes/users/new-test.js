import { moduleFor, test } from 'ember-qunit';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

let App;

moduleFor('route:users/new', 'Unit | Route | users/new', {
  needs: [
    'model:user',
    'model:group',
    'model:membership',
    'model:permission',
    'service:can',
    'service:layout-manager',
    'service:session',
    'service:router-scroll',
    'service:scheduler'
  ],

  beforeEach() {
    App = startApp();
  },
  afterEach() {
    destroyApp(App);
  }
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});

test('model is removed on deactivation', function(assert) {
  itShouldRemoveNewModel(assert, this.subject(), 'user');
});

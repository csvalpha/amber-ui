import { moduleFor, test } from 'ember-qunit';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

let App;

moduleFor('route:users/edit', 'Unit | Route | users/edit', {
  needs: [
    'model:user',
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

test('it has a correct modelName', function(assert) {
  const route = this.subject();

  assert.equal('user', route.get('modelName'));
});

import { moduleFor, test } from 'ember-qunit';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

let App;

moduleFor('route:groups/edit', 'Unit | Route | groups/edit', {
  needs: [
    'model:group',
    'model:membership',
    'model:user',
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

  assert.equal('group', route.get('modelName'));
});

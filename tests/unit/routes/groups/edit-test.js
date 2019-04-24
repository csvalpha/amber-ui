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

test('model is rolled back on deactivation', function(assert) {
  itShouldRollbackUnsavedChanges(assert, this.subject(), 'group', ['name', 'description']);
});

test('memberships are rolled back on deactivation', function(assert) {
  itShouldRollbackRelationship(assert, this.subject(), 'group', 'memberships', 'membership', ['function']);
});


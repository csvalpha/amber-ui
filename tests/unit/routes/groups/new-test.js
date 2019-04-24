import { moduleFor, test } from 'ember-qunit';
import startApp from '../../../helpers/start-app';
import destroyApp from '../../../helpers/destroy-app';

let App;

moduleFor('route:groups/new', 'Unit | Route | groups/new', {
  needs: [
    'model:group',
    'model:membership',
    'model:permission',
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

test('model is removed on deactivation', function(assert) {
  itShouldRemoveNewModel(assert, this.subject(), 'group');
});

test('memberships are removed on deactivation', function(assert) {
  const relationshipType = 'membership';
  const relationshipName = 'memberships';

  itShouldRemoveRelationship(assert, this.subject(), relationshipName, relationshipType);
});

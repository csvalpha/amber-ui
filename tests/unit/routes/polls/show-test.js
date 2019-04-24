import { moduleFor, test } from 'ember-qunit';

moduleFor('route:polls/show', 'Unit | Route | polls/show', {
  needs: [
    'service:can',
    'service:layout-manager',
    'service:session',
    'service:router-scroll',
    'service:scheduler'
  ]
});

test('it exists', function(assert) {
  const route = this.subject();
  assert.ok(route);
});

test('it has a correct modelName', function(assert) {
  const route = this.subject();

  assert.equal('poll', route.get('modelName'));
});

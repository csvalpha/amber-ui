import { moduleFor, test } from 'ember-qunit';

moduleFor('route:articles/show', 'Unit | Route | articles/show', {
  needs: [
    'service:ajax',
    'service:can',
    'service:layout-manager',
    'service:session',
    'service:router-scroll',
    'service:scheduler'
  ]
});

test('it has a correct modelName', function(assert) {
  const route = this.subject();

  assert.equal('article', route.get('modelName'));
});

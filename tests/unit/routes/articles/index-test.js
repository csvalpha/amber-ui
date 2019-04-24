import { moduleFor, test } from 'ember-qunit';

moduleFor('route:articles/index', 'Unit | Route | articles/index', {
  needs: [
    'service:ajax',
    'service:can',
    'service:session',
    'service:layout-manager',
    'service:router-scroll',
    'service:scheduler',
    'service:i18n'
  ]
});

test('it has a correct modelName', function(assert) {
  const route = this.subject();

  assert.equal('article', route.get('modelName'));
});

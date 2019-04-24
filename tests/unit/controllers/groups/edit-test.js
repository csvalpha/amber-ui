import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:groups/edit', 'Unit | Controller | groups/edit', {
  needs: ['service:session', 'service:flash-notice', 'model:group', 'model:user', 'service:scheduler', 'service:router-scroll']
});

test('test if groupKindOptions contains options with capitalized labels', function(assert) {
  const controller = this.subject();
  assert.equal('Bestuur', controller.get('groupKindOptions').findBy('value', 'bestuur').label);
  assert.equal('Commissie', controller.get('groupKindOptions').findBy('value', 'commissie').label);
  assert.equal('Huis', controller.get('groupKindOptions').findBy('value', 'huis').label);
});

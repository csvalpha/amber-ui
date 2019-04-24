import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('link-to', 'Unit | Component | link to', {
  unit: true
});

test('it adds \'data-test-link\' to the attributeBindings property', function(assert) {
  const linkComponent = this.subject({ params: ['dummy'] });

  assert.ok(linkComponent.attributeBindings.includes('data-test-link'));
  assert.ok(linkComponent.attributeBindings.includes('href'));
  assert.ok(linkComponent.attributeBindings.includes('rel'));
});

test('it uses ids of models instead of models', function(assert) {
  const linkComponent = this.subject({
    params: [
      'path',
      'title',
      EmberObject.create({ id: 3 }),
      EmberObject.create({ id: 218 }),
      'nope']
  });

  linkComponent.didReceiveAttrs();

  assert.deepEqual(linkComponent.get('models'), [3, 218, 'nope']);
});

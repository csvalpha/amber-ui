import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | link to', function(hooks) {
  setupTest(hooks);

  test('it adds \'data-test-link\' to the attributeBindings property', function(assert) {
    const linkComponent = this.owner.factoryFor('component:link-to').create({ params: ['dummy'] });

    assert.ok(linkComponent.attributeBindings.includes('data-test-link'));
    assert.ok(linkComponent.attributeBindings.includes('href'));
    assert.ok(linkComponent.attributeBindings.includes('rel'));
  });

  test('it uses ids of models instead of models', function(assert) {
    const linkComponent = this.owner.factoryFor('component:link-to').create({
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
});

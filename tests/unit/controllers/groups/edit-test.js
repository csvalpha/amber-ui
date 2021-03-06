import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | groups/edit', function(hooks) {
  setupTest(hooks);

  test('test if groupKindOptions contains options with capitalized labels', function(assert) {
    const controller = this.owner.lookup('controller:groups/edit');
    assert.equal('Bestuur', controller.groupKindOptions.findBy('value', 'bestuur').label);
    assert.equal('Commissie', controller.groupKindOptions.findBy('value', 'commissie').label);
    assert.equal('Huis', controller.groupKindOptions.findBy('value', 'huis').label);
  });
});


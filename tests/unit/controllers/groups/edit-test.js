import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | groups/edit', function (hooks) {
  setupTest(hooks);

  test('test if groupKindOptions contains options with capitalized labels', function (assert) {
    const controller = this.owner.lookup('controller:groups/edit');
    assert.equal(
      controller.groupKindOptions.findBy('value', 'bestuur').label,
      'Bestuur'
    );
    assert.equal(
      controller.groupKindOptions.findBy('value', 'commissie').label,
      'Commissie'
    );
    assert.equal(
      controller.groupKindOptions.findBy('value', 'huis').label,
      'Huis'
    );
  });
});

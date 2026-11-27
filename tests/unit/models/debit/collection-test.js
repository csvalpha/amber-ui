import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | debit/collection', function (hooks) {
  setupTest(hooks);

  test('isFinalized', function (assert) {
    const collection = run(() =>
      this.owner.lookup('service:store').createRecord('debit/collection')
    );
    assert.false(collection.isFinalized);

    run(() => collection.set('finalizedAt', new Date()));
    assert.true(collection.isFinalized);
  });
});

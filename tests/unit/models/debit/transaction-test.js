import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | debit/transaction', function (hooks) {
  setupTest(hooks);

  test('absoluteAmount turns a declaration settlement positive', function (assert) {
    const transaction = run(() =>
      this.owner
        .lookup('service:store')
        .createRecord('debit/transaction', { amount: -12.5 })
    );
    assert.equal(transaction.absoluteAmount, 12.5);

    run(() => transaction.set('amount', 7));
    assert.equal(transaction.absoluteAmount, 7);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | debit/transactions/transaction/destroy',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      const route = this.owner.lookup(
        'route:debit/transactions/transaction/destroy'
      );
      assert.ok(route);
    });
  }
);

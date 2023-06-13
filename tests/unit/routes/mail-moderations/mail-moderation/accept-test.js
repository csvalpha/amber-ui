import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | mail-moderations/mail-moderation/accept',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      const route = this.owner.lookup(
        'route:mail-moderations/mail-moderation/accept'
      );
      assert.ok(route);
    });
  }
);

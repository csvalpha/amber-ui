import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

function setupSession(owner, permissions = []) {
  owner.register(
    'service:session',
    class extends Service {
      isAuthenticated = true;
      hasPermission(name) {
        return permissions.includes(name);
      }
    }
  );
}

const openCollection = { isFinalized: false };
const finalizedCollection = { isFinalized: true };

module('Unit | Ability | debit/collection', function (hooks) {
  setupTest(hooks);

  test('a finalized collection can not be destroyed', function (assert) {
    setupSession(this.owner, ['debit/collection.destroy']);
    const ability = this.owner.lookup('ability:debit/collection');

    ability.model = openCollection;
    assert.true(ability.canDestroy);

    ability.model = finalizedCollection;
    assert.false(ability.canDestroy);
  });

  test('the sepa file can only be downloaded for a finalized collection', function (assert) {
    setupSession(this.owner, ['debit/collection.create']);
    const ability = this.owner.lookup('ability:debit/collection');

    ability.model = openCollection;
    assert.false(ability.canDownloadSepa);

    ability.model = finalizedCollection;
    assert.true(ability.canDownloadSepa);

    // Without a model the API checks the finalization
    ability.model = null;
    assert.true(ability.canDownloadSepa);
  });

  test('only an open collection can be finalized', function (assert) {
    setupSession(this.owner, ['debit/collection.create']);
    const ability = this.owner.lookup('ability:debit/collection');

    ability.model = openCollection;
    assert.true(ability.canFinalize);

    ability.model = finalizedCollection;
    assert.false(ability.canFinalize);

    ability.model = null;
    assert.false(ability.canFinalize);
  });

  test('nothing is allowed without permissions', function (assert) {
    setupSession(this.owner);
    const ability = this.owner.lookup('ability:debit/collection');

    ability.model = openCollection;
    assert.false(ability.canDestroy);
    assert.false(ability.canFinalize);
    ability.model = finalizedCollection;
    assert.false(ability.canDownloadSepa);
  });
});

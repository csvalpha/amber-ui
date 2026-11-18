import Service from '@ember/service';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

function setupSession(owner, { id = '1', permissions = [] } = {}) {
  owner.register(
    'service:session',
    class extends Service {
      isAuthenticated = true;
      currentUser = EmberObject.create({ id });
      hasPermission(name) {
        return permissions.includes(name);
      }
    }
  );
}

function declaration(status, ownerId = '1') {
  return {
    status,
    isPending: status === 'pending',
    isApproved: status === 'approved',
    isSettleable: ['approved', 'partially_paid'].includes(status),
    isOwner: (user) => user.get('id') === ownerId,
  };
}

module('Unit | Ability | declaration', function (hooks) {
  setupTest(hooks);

  test('an owner can only edit and destroy a pending declaration', function (assert) {
    setupSession(this.owner);
    const ability = this.owner.lookup('ability:declaration');

    ability.model = declaration('pending');
    assert.true(ability.canEdit);
    assert.true(ability.canDestroy);
    assert.false(ability.canApprove);

    ability.model = declaration('approved');
    assert.false(ability.canEdit);
    assert.false(ability.canDestroy);
    assert.false(ability.canToggleNextCollection);
  });

  test('another member can not edit a declaration', function (assert) {
    setupSession(this.owner, { id: '2' });
    const ability = this.owner.lookup('ability:declaration');

    ability.model = declaration('pending', '1');
    assert.false(ability.canEdit);
    assert.false(ability.canDestroy);
  });

  test('the treasurer can handle declarations', function (assert) {
    setupSession(this.owner, {
      id: '2',
      permissions: [
        'declaration.read',
        'declaration.update',
        'declaration.destroy',
      ],
    });
    const ability = this.owner.lookup('ability:declaration');

    ability.model = declaration('pending', '1');
    assert.true(ability.canApprove);
    assert.true(ability.canReject);
    assert.true(ability.canShowAll);

    ability.model = declaration('partially_paid', '1');
    assert.true(ability.canEdit);
    assert.false(ability.canEditContent);
    assert.true(ability.canToggleNextCollection);
    assert.false(ability.canDestroy);

    ability.model = declaration('paid', '1');
    assert.false(ability.canEdit);
  });
});

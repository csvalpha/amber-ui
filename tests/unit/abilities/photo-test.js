import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

function setupSession(owner, permissions = []) {
  owner.register(
    'service:session',
    class extends Service {
      hasPermission(name) {
        return permissions.includes(name);
      }
    }
  );
}

module('Unit | Ability | photo', function (hooks) {
  setupTest(hooks);

  test('logged out visitors cannot show photos or their comments', function (assert) {
    setupSession(this.owner);
    const ability = this.owner.lookup('ability:photo');

    assert.false(ability.canShow);
    assert.false(ability.canShowPhotoComments);
  });

  test('users with read permissions can show photos and their comments', function (assert) {
    setupSession(this.owner, ['photo.read', 'photo-comment.read']);
    const ability = this.owner.lookup('ability:photo');

    assert.true(ability.canShow);
    assert.true(ability.canShowPhotoComments);
  });
});

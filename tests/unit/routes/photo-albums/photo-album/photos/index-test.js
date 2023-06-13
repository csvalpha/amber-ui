import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | photo-albums/photo-album/photos/index',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      const route = this.owner.lookup(
        'route:photo-albums/photo-album/photos/index'
      );
      assert.ok(route);
    });
  }
);

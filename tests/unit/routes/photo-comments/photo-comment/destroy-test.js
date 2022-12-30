import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | photo-comments/photo-comment/destroy', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup(
      'route:photo-comments/photo-comment/destroy'
    );
    assert.ok(route);
  });
});

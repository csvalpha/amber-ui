import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Route | article-comments/article-comment/destroy',
  function (hooks) {
    setupTest(hooks);

    test('it exists', function (assert) {
      const route = this.owner.lookup(
        'route:article-comments/article-comment/destroy'
      );
      assert.ok(route);
    });
  }
);

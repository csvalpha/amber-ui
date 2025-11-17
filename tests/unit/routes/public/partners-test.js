import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | public/partners', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:public/partners');
    assert.ok(route);
  });
});

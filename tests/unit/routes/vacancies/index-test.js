import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vacancies/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:vacancies/index');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vacancies/show', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:vacancies/show');
    assert.ok(route);
  });
});

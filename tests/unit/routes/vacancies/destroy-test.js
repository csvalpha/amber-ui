import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vacancies/destroy', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:vacancies/destroy');
    assert.ok(route);
  });
});

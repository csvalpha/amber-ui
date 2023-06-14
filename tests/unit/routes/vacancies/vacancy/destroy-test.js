import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vacancies/vacancy/destroy', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:vacancies/vacancy/destroy');
    assert.ok(route);
  });
});

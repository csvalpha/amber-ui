import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vacancies/vacancy/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:vacancies/vacancy/edit');
    assert.ok(route);
  });
});

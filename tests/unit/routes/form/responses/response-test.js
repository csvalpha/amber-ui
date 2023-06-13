import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | form/responses/response', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:form/responses/response');
    assert.ok(route);
  });
});

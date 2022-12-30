import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | activities/ical', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:activities/ical');
    assert.ok(route);
  });
});

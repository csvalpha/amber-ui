import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupTest } from 'ember-qunit';

module('Unit | Model | application/dirty-save', function (hooks) {
  setupTest(hooks);

  test('DirtySaveModel#saveIfDirty', function (assert) {
    const store = this.owner.lookup('service:store');
    // Random model that extends DirtySaveModel.
    const response = run(() => store.createRecord('forms/response'));
    run(() => response.save());

    response.completed = true;
    assert.ok(response.hasDirtyAttributes);

    run(() => response.saveIfDirty());
    assert.notOk(response.hasDirtyAttributes);
  });
});

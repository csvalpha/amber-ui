import EmberObject from '@ember/object';
import RollbackModelOnDeactivationRouteMixin from 'alpha-amber/mixins/rollback-model-on-deactivation-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | rollback model on deactivation', function() {
  // Only testing whether rollbackAttributes is called is sufficient, the method itself is tested by ember
  const DummyModel = EmberObject.extend({
    _rolledBack: false,
    rollbackAttributes() {
      this._rolledBack = true;
    }
  });

  test('it rolls back unsaved changes', (assert) => {
    const RollbackModelOnDeactivationObject = EmberObject.extend(RollbackModelOnDeactivationRouteMixin);
    const subject = RollbackModelOnDeactivationObject.create();

    const model = DummyModel.create();
    subject.set('controller', EmberObject.extend({ model }).create());

    subject.deactivate();
    assert.ok(model.get('_rolledBack'));
  });
});

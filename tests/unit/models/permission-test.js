import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let permission;

module('Unit | Model | permission', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    permission = run(() => this.owner.lookup('service:store').createRecord('permission'));
  });

  test('Permission#model', (assert) => {
    assert.expect(1);
    run(() => {
      permission.setProperties({ name: 'form/closed-question.read' });
      assert.equal('form/closed-question', permission.get('model'));
    });
  });

  test('Permission#action', (assert) => {
    assert.expect(1);
    run(() => {
      permission.setProperties({ name: 'form/closed-question.read' });
      assert.equal('read', permission.get('action'));
    });
  });
});

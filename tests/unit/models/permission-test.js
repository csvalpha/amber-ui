import { run } from '@ember/runloop';
import { moduleForModel, test } from 'ember-qunit';

let permission;

moduleForModel('permission', 'Unit | Model | permission', {
  needs: ['model:permission', 'model:membership', 'model:group', 'service:session'],
  beforeEach() {
    permission = this.subject();
  }
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

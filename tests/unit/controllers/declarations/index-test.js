import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | declarations/index', function (hooks) {
  setupTest(hooks);

  test('statusOptions contains every status', function (assert) {
    const controller = this.owner.lookup('controller:declarations/index');
    assert.deepEqual(
      controller.statusOptions.map((option) => option.value),
      ['pending', 'approved', 'partially_paid', 'paid', 'rejected']
    );
    assert.equal(
      controller.statusOptions.find((option) => option.value === 'paid').label,
      'Uitbetaald'
    );
  });

  test('setStatus filters and goes back to the first page', function (assert) {
    const controller = this.owner.lookup('controller:declarations/index');
    controller.page = 3;

    controller.setStatus({ target: { value: 'approved' } });
    assert.equal(controller.status, 'approved');
    assert.equal(controller.page, 1);

    controller.setStatus({ target: { value: '' } });
    assert.strictEqual(controller.status, null);
  });
});

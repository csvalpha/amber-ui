import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let declaration;

module('Unit | Model | declaration', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    declaration = run(() =>
      this.owner.lookup('service:store').createRecord('declaration')
    );
  });

  test('statusLabel', function (assert) {
    run(() => declaration.setProperties({ status: 'partially_paid' }));
    assert.equal(declaration.statusLabel, 'Gedeeltelijk uitbetaald');
  });

  test('isSettleable', function (assert) {
    run(() => declaration.setProperties({ status: 'approved' }));
    assert.true(declaration.isSettleable);

    run(() => declaration.setProperties({ status: 'paid' }));
    assert.false(declaration.isSettleable);
  });

  test('hasPdf', function (assert) {
    assert.false(declaration.hasPdf);

    run(() =>
      declaration.setProperties({ status: 'approved', approvedAt: new Date() })
    );
    assert.true(declaration.hasPdf);
  });

  test('receiptPreview only previews images', function (assert) {
    run(() =>
      declaration.setProperties({ receipt: 'data:image/png;base64,abc' })
    );
    assert.equal(declaration.receiptPreview, 'data:image/png;base64,abc');

    run(() =>
      declaration.setProperties({ receipt: 'data:application/pdf;base64,abc' })
    );
    assert.equal(declaration.receiptPreview, null);
  });
});

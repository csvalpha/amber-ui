import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | date-only', function (hooks) {
  setupTest(hooks);

  test('deserializes to local midnight of the same calendar day', function (assert) {
    const transform = this.owner.lookup('transform:date-only');
    const date = transform.deserialize('2026-11-18');

    assert.equal(date.getFullYear(), 2026);
    assert.equal(date.getMonth(), 10);
    assert.equal(date.getDate(), 18);
    assert.equal(date.getHours(), 0);
  });

  test('serializes a local date without time', function (assert) {
    const transform = this.owner.lookup('transform:date-only');
    assert.equal(
      transform.serialize(new Date(2026, 10, 18, 23, 30)),
      '2026-11-18'
    );
  });

  test('round trips the same calendar day', function (assert) {
    const transform = this.owner.lookup('transform:date-only');
    assert.equal(
      transform.serialize(transform.deserialize('2026-01-01')),
      '2026-01-01'
    );
  });

  test('keeps empty values empty', function (assert) {
    const transform = this.owner.lookup('transform:date-only');
    assert.strictEqual(transform.deserialize(null), null);
    assert.strictEqual(transform.serialize(undefined), null);
  });
});

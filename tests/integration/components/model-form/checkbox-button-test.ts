import { TestContext, click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

interface GroupValueTestContext extends TestContext {
  groupValue: string[];
}

module('Integration | Component | checkbox-button', function (hooks) {
  setupRenderingTest(hooks);

  test('should toggle checked attribute on click', async function (assert) {
    assert.expect(3);

    await render(
      hbs`<ModelForm::CheckboxButton @value='value' data-test-checkbox-button />`
    );

    assert.dom('[data-test-checkbox-button]').isNotChecked();

    await click('[data-test-checkbox-button]');
    assert.dom('[data-test-checkbox-button]').isChecked();

    await click('[data-test-checkbox-button]');
    assert.dom('[data-test-checkbox-button]').isNotChecked();
  });

  test('should be initially checked when value is in groupValue', async function (this: GroupValueTestContext, assert) {
    assert.expect(1);

    this.groupValue = ['value'];

    await render(
      hbs`<ModelForm::CheckboxButton @value='value' @groupValue={{this.groupValue}} data-test-checkbox-button />`
    );

    assert.dom('[data-test-checkbox-button]').isChecked();
  });

  test('should toggle value on click', async function (this: GroupValueTestContext, assert) {
    assert.expect(2);

    this.groupValue = [];

    await render(
      hbs`<ModelForm::CheckboxButton @value='value' @groupValue={{this.groupValue}} data-test-checkbox-button />`
    );

    await click('[data-test-checkbox-button]');
    assert.deepEqual(this.groupValue, ['value']);

    await click('[data-test-checkbox-button]');
    assert.deepEqual(this.groupValue, []);
  });
});

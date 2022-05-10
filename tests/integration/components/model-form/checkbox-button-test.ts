import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | checkbox-button', function (hooks) {
  setupRenderingTest(hooks);

  test('should toggle checked attribute on change event', async function (assert) {
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
});

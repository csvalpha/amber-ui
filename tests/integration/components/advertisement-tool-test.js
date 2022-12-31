import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | advertisement-tool', function (hooks) {
  setupRenderingTest(hooks);

  test('should render all ads', async function (assert) {
    assert.expect(1);

    await render(hbs`{{advertisement-tool}}`);

    assert.equal(
      this.element.querySelectorAll('.advertisement-item').length,
      34 // Number of advertisements times two
    );
  });
});

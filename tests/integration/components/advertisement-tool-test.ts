import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | advertisement-tool', function (hooks) {
  setupRenderingTest(hooks);

  test('should render all ads', async function (assert) {
    assert.expect(1);

    await render(hbs`<AdvertisementTool />`);

    // Number of advertisements times two
    assert.dom('[data-test-advertisement-item]').exists({ count: 34 });
  });
});

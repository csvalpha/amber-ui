import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | public/card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Public::Card />`);
    assert.dom(this.element).hasText('');

    await render(hbs`<Public::Card @title="title"/>`);
    assert.dom(this.element).hasText('title');
    await render(hbs`<Public::Card @subtitle="subtitle"/>`);
    assert.dom(this.element).hasText('subtitle');
    await render(hbs`<Public::Card @text="sample text"/>`);
    assert.dom(this.element).hasText('sample text');
  });
});

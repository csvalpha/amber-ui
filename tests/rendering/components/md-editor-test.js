import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | markdown editor', function(hooks) {
  setupRenderingTest(hooks);

  test('should render the textarea content', async function(assert) {
    assert.expect(1);

    this.set('markdownContent', 'This is some text');
    await render(hbs`{{md-editor content=markdownContent textareaId='newForumPost'}}`);

    assert.equal(this.element.querySelector('textarea').value, 'This is some text');
  });
});


import { TestContext, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupRenderingTest } from 'ember-qunit';

interface MarkdownContentTestContext extends TestContext {
  markdownContent: string;
}

module('Integration | Component | md-editor', function (hooks) {
  setupRenderingTest(hooks);

  test('should render the textarea content', async function (this: MarkdownContentTestContext, assert) {
    assert.expect(1);

    this.markdownContent = 'This is some text.';

    await render(
      hbs`<MdEditor @content={{this.markdownContent}} @textareaId='new-forum-post' />`
    );

    assert.dom('[data-test-md-editor-textarea]').hasText('This is some text.');
  });
});

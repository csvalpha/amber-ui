// app/components/forum/forum-post-new.js
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-apply'; // Import modifier for Glimmer components lifecycle

export default class ForumPostNewComponent extends Component {
  @service store;
  @service flashNotice;

  @tracked focusInTextArea = false;

  constructor() {
    super(...arguments);
    // Bind functions if using them as direct event handlers via modifiers
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  get content() {
    return this.args.content;
  }

  set content(content) {
    this.args.setContent(content);
  }

  // Modifier to attach and remove event listeners
  // This ensures listeners are correctly managed with component lifecycle
  @modifier
  setupTextAreaListeners(element) {
    // element will be the <textarea> itself because we'll apply this modifier directly to it
    element.addEventListener('focusin', this.handleFocusIn);
    element.addEventListener('focusout', this.handleFocusOut);
    element.addEventListener('keydown', this.handleKeyDown); // Add keydown listener

    return () => {
      element.removeEventListener('focusin', this.handleFocusIn);
      element.removeEventListener('focusout', this.handleFocusOut);
      element.removeEventListener('keydown', this.handleKeyDown);
    };
  }

  @action
  handleFocusIn() {
    this.focusInTextArea = true;
    // No action here other than setting tracked property
  }

  @action
  handleFocusOut() {
    this.focusInTextArea = false;
    // No action here other than setting tracked property
  }

  @action
  handleKeyDown(event) {
    // These are the shortcut keys from your route's keyboardShortcuts object
    // You might need to make these more dynamic or pass them down from the route
    // For now, let's hardcode the keys that cause issues (left, up, right, down)
    const shortcutKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];

    if (shortcutKeys.includes(event.key)) {
      event.stopPropagation(); // Stop the event from bubbling up to the document
      // If stopping propagation isn't enough, you might also need preventDefault
      // event.preventDefault(); // Prevents default browser behavior for the key (e.g., cursor movement)
    }
  }

  @action
  async save() {
    let { content, thread } = this.args;
    await this.store
      .createRecord('forum/post', {
        message: content,
        thread,
      })
      .save();
    this.flashNotice.sendSuccess('Forumbericht toegevoegd!');
    this.content = '';
    this.args.onSubmit();
  }

  @action
  cancel() {
    this.content = '';
  }
}
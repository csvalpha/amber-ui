import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

// todo: incorporate the model-save-util into components?
export default class ForumPostNewComponent extends Component {
  @service store;
  @service flashNotice;

  @action
  async save() {
    await this.store
      .createRecord('forum/post', {
        message: this.args.content,
        thread: this.args.thread,
      })
      .save();
    this.flashNotice.sendSuccess('Forumbericht toegevoegd!');
    this.args.updateContent('');
    this.onSubmit();
  }

  @action
  cancel() {
    this.args.updateContent('');
  }
}

import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { action } from '@ember/object';

// todo: incorporate the model-save-util into components?
export default class ForumPostNewComponent extends Component {
  @service store;
  @service flashNotice;

  @action
  async save() {
    let { content, thread } = this;
    await this.store
      .createRecord('forum/post', {
        message: content,
        thread,
      })
      .save();
    this.flashNotice.sendSuccess('Forumbericht toegevoegd!');
    this.set('content', '');
    this.onSubmit();
  }

  @action
  cancel() {
    this.content = '';
  }
}

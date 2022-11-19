import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

// todo: incorporate the model-save-util into components?
export default class ForumPostNewComponent extends Component {
  @service store;
  @service flashNotice;

  get content() {
    return this.args.content;
  }

  set content(content) {
    this.args.onChangeContent(content);
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

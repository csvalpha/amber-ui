import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { action } from '@ember/object';

export default class ForumPostNewComponent extends Component {
  @service store;
  @service flashNotice;

  @action
  save() {
    let { content, thread } = this;

    this.store.createRecord('forum/post', {
      message: content,
      thread
    }).save().then(() => {
      this.flashNotice.sendSuccess('Forumbericht toegevoegd!');
      this.set('content', '');
      this.onSubmit();
    });
  }

  @action
  cancel() {
    this.content = '';
  }
}

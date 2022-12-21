import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Comments extends Component {
  @service store;
  @service flashNotice;
  @tracked
  content = null;

  @action
  async submitPhotoComment() {
    const content = this.content.trim();

    if (content.length > 0) {
      const photo = this.args.model;
      const photoComment = this.store.createRecord('photoComment', {
        content,
        photo,
      });

      await photoComment.save();
      this.flashNotice.sendSuccess('Reactie opgeslagen!');
      photo.reload(); // Reload for updated Photo#amountOfComments
    }
    this.content = null;
  }
}

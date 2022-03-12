import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Photo extends Component {
  @service store;
  @service('flash-notice') flashNotice;
  @tracked
  content = null;
  @tracked
  showExif = false;
  @action
  toggleShowExif() {
    this.showExif = !this.showExif;
  }
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

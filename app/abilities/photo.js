import { Ability } from 'ember-can';

export default class Photo extends Ability {
  get canShow() {
    return this.session.hasPermission('photo.read');
  }

  get canDestroy() {
    return this.session.hasPermission('photo.destroy');
  }

  get canShowPhotoComments() {
    return this.session.hasPermission('photo-comment.read');
  }

  get canShowPhotoTags() {
    return this.session.hasPermission('photo-tag.read');
  }
}

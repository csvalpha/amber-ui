import { Ability } from 'ember-can';

export default class Photo extends Ability {
  get canDestroy() {
    return this.session.hasPermission('photo.destroy');
  }

  get canShowPhotoComments() {
    return (
      this.session.hasPermission('photo-comment.read') ||
      this.model.photoAlbum.publiclyVisible
    );
  }
}

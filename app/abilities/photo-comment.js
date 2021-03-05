import { Ability } from 'ember-can';

export default class PhotoComment extends Ability {
  get canShow() {
    return this.session.hasPermission('photo-comment.read');
  }

  get canCreate() {
    return this.session.hasPermission('photo-comment.create');
  }

  get canDestroy() {
    return this.session.hasPermission('photo-comment.destroy');
  }
}

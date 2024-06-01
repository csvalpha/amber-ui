import { Ability } from 'ember-can';
import { isNone } from '@ember/utils';

export default class PhotoTag extends Ability {
  get canShow() {
    return this.session.hasPermission('photo-tag.read');
  }

  get canCreate() {
    return this.session.hasPermission('photo-tag.create');
  }

  get canDestroy() {
    return (
      this.session.hasPermission('photo-tag.destroy') ||
      this.isTagOwner(this.model) ||
      this.isTagged(this.model)
    );
  }

  isTagOwner(photoTag) {
    const { currentUser } = this.session;
    return (
      !isNone(currentUser) &&
      photoTag.get('author.id') === currentUser.get('id')
    );
  }

  isTagged(photoTag) {
    const { currentUser } = this.session;
    return (
      !isNone(currentUser) &&
      photoTag.get('taggedUser.id') === currentUser.get('id')
    );
  }
}

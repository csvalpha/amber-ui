import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class Response extends Ability {
  get canShow() {
    return this.session.hasPermission('form/response.read');
  }

  get canCreate() {
    return this.session.hasPermission('form/response.create');
  }

  get canDestroy() {
    return this.session.hasPermission('form/response.destroy') || this.isResponseOwner(this.model);
  }

  isResponseOwner(response) {
    return !isNone(response) && response.get('user.id') === this.session.currentUser.id;
  }
}

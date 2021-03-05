import { Ability } from 'ember-can';

export default class MailModeration extends Ability {
  get canShow() {
    return this.session.isAuthenticated;
  }

  get canAccept() {
    return this.session.isAuthenticated;
  }

  get canReject() {
    return this.session.isAuthenticated;
  }

  get canDestroy() {
    return this.session.isAuthenticated;
  }
}

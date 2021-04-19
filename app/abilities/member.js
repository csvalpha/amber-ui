import { Ability } from 'ember-can';

export default class Member extends Ability {
  get canShow() {
    return this.session.isAuthenticated;
  }
}

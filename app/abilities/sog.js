import { Ability } from 'ember-can';

export default class Sog extends Ability {
  get canShow() {
    return this.session.isAuthenticated;
  }
}

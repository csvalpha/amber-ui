import { Ability } from 'ember-can';

export default class NameTrainer extends Ability {
  get canShow() {
    return this.session.hasPermission('membership.read');
  }
}

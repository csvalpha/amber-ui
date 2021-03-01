import { Ability } from 'ember-can';

export default class Membership extends Ability {
  get canCreate() {
    return this.session.hasPermission('membership.create');
  }

  get canShow() {
    return this.session.hasPermission('membership.read');
  }

  get canUpdate() {
    return this.session.hasPermission('membership.update');
  }

  get canDestroy() {
    return this.session.hasPermission('membership.destroy') || this.model.isNew;
  }
}

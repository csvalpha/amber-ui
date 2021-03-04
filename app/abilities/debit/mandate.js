import { Ability } from 'ember-can';

export default class Mandate extends Ability {
  get canShow() {
    return this.session.hasPermission('debit/mandate.read');
  }

  get canEdit() {
    return this.session.hasPermission('debit/mandate.update');
  }

  get canCreate() {
    return this.session.hasPermission('debit/mandate.create');
  }

  get canDestroy() {
    return this.session.hasPermission('debit/mandate.destroy');
  }
}

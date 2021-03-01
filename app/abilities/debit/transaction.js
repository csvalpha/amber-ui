import { Ability } from 'ember-can';

export default class Transaction extends Ability {
  get canEdit() {
    return this.session.hasPermission('debit/transaction.update');
  }

  get canCreate() {
    return this.session.hasPermission('debit/transaction.create');
  }

  get canDestroy() {
    return this.session.hasPermission('debit/transaction.destroy');
  }
}

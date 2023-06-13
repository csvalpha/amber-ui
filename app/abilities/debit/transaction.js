import { Ability } from 'ember-can';

export default class Transaction extends Ability {
  get canShow() {
    return this.session.hasPermission('debit/transaction.read');
  }

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

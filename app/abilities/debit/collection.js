import { Ability } from 'ember-can';

export default class Collection extends Ability {
  get canShow() {
    return this.session.hasPermission('debit/collection.read');
  }

  get canEdit() {
    return this.session.hasPermission('debit/collection.update');
  }

  get canCreate() {
    return this.session.hasPermission('debit/collection.create');
  }

  get canDestroy() {
    return this.session.hasPermission('debit/collection.destroy');
  }

  get canDownloadSepa() {
    return this.session.hasPermission('debit/collection.create');
  }
}

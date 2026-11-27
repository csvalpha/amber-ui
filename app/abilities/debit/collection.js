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

  // A finalized collection holds the definitive declaration settlements
  get canDestroy() {
    return (
      this.session.hasPermission('debit/collection.destroy') &&
      !this.model?.isFinalized
    );
  }

  // Without a model (e.g. the sepa route) only the permission is checked, the API checks finalization
  get canDownloadSepa() {
    return (
      this.session.hasPermission('debit/collection.create') &&
      (!this.model || this.model.isFinalized)
    );
  }

  get canFinalize() {
    return (
      this.session.hasPermission('debit/collection.create') &&
      Boolean(this.model) &&
      !this.model.isFinalized
    );
  }
}

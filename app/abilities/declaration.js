import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

// Mirrors DeclarationPolicy in amber-api: members manage their own pending
// declarations, the treasurer (declaration.* permissions) handles all of them.
export default class Declaration extends Ability {
  get canShow() {
    return this.session.isAuthenticated;
  }

  get canCreate() {
    return this.session.isAuthenticated;
  }

  get canShowAll() {
    return this.session.hasPermission('declaration.read');
  }

  get canEdit() {
    if (this.isTreasurer('update')) {
      return !['paid', 'rejected'].includes(this.model.status);
    }
    return this.isOwner() && this.model.isPending;
  }

  get canEditContent() {
    if (this.isTreasurer('update')) {
      return this.model.isPending || this.model.isApproved;
    }
    return this.isOwner() && this.model.isPending;
  }

  get canDestroy() {
    if (this.isTreasurer('destroy')) {
      return this.model.isPending || this.model.isApproved;
    }
    return this.isOwner() && this.model.isPending;
  }

  get canApprove() {
    return this.isTreasurer('update') && this.model.isPending;
  }

  get canReject() {
    return this.canApprove;
  }

  get canToggleNextCollection() {
    return this.isTreasurer('update') && this.model.isSettleable;
  }

  get canMarkManuallyPaid() {
    return this.canToggleNextCollection;
  }

  isTreasurer(action) {
    return this.session.hasPermission(`declaration.${action}`);
  }

  isOwner() {
    const { currentUser } = this.session;
    return !isNone(currentUser) && this.model.isOwner(currentUser);
  }
}

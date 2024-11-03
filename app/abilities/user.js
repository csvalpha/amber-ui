import { Ability } from 'ember-can';

export default class User extends Ability {
  get canShow() {
    return this.session.hasPermission('user.read');
  }

  /**
   * You can view all users if you have sufficient permissions, but each individual user can be viewed when the user can
   * view members (member of group 'Leden').
   */
  get canShowIndividual() {
    return this.session.isAuthenticated;
  }

  get canShowOwn() {
    return this.session.isAuthenticated && this.session.currentUser?.id;
  }

  get canCreate() {
    return this.session.hasPermission('user.create');
  }

  get canEditAllProperties() {
    return (
      this.session.hasPermission('user.update') ||
      this.session.hasPermission('user.create')
    );
  }

  get canBatchUpload() {
    return this.canCreate;
  }

  get canExport() {
    return this.session.hasPermission('user.update');
  }

  get canShowWebdav() {
    return this.session.isAuthenticated;
  }

  get canDestroy() {
    return !this.isCurrentUser && this.session.hasPermission('user.destroy');
  }

  get canEdit() {
    return this.isCurrentUser || this.session.hasPermission('user.update');
  }

  get canResendActivationCode() {
    return (
      this.session.hasPermission('user.create') &&
      this.model.activatedAt === null
    );
  }

  get isCurrentUser() {
    return this.model.id === this.session.currentUser.id;
  }
}

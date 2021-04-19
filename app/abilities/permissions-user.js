import { Ability } from 'ember-can';

export default class PermissionsUser extends Ability {
  get canShow() {
    return this.session.hasPermission('permissions-users.create');
  }

  get canCreate() {
    return this.session.hasPermission('permissions-users.create');
  }
}

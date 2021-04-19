import { Ability } from 'ember-can';

export default class GroupsPermission extends Ability {
  get canCreate() {
    return this.session.hasPermission('groups-permissions.create');
  }
}

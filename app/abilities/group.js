import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default class Group extends Ability {
  get canEdit() {
    const group = this.model;
    return this.session.hasPermission('group.update') || (group.get('name') !== 'Leden' && this.isGroupMember(group));
  }

  get canExport() {
    return this.canEdit;
  }

  get canCreate() {
    return this.session.hasPermission('group.create');
  }

  get canShow() {
    return this.session.hasPermission('group.read');
  }

  // Protected fields are those fields which cannot be updated by members of group but only by members with permissions
  get canEditProtectedFields() {
    return this.session.hasPermission('group.update');
  }

  isGroupMember(group) {
    const { currentUser } = this.session;
    return !isNone(currentUser) && group.get('memberships').filterBy('userIsCurrentlyMember').mapBy('user.id').includes(currentUser.get('id'));
  }
}

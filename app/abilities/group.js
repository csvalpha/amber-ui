import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canEdit: computed('session.currentUser', 'model.name', function() {
    const group = this.model;
    return this.session.hasPermission('group.update') || (group.get('name') !== 'Leden' && this.isGroupMember(group));
  }),
  canExport: alias('canEdit'),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('group.create');
  }),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('group.read');
  }),
  // Protected fields are those fields which cannot be updated by members of group but only by members with permissions
  canEditProtectedFields: computed('session.currentUser', function() {
    return this.session.hasPermission('group.update');
  }),
  isGroupMember(group) {
    const currentUser = this.get('session.currentUser');
    return !isNone(currentUser) && group.get('memberships').filterBy('userIsCurrentlyMember').mapBy('user.id').includes(currentUser.get('id'));
  }
});

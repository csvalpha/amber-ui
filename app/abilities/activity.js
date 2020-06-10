import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('activity.create');
  }),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('activity.read');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('activity.destroy');
  }),
  canSelectAllGroups: computed('session.currentUser', function() {
    return this.session.hasPermission('activity.update');
  }),
  canShowIcal: computed('session.currentUser', function() {
    return this.session.hasPermission('activity.read');
  }),
  canEdit: computed('session.currentUser', 'model', function() {
    return this.session.hasPermission('activity.update') || this.isActivityOwner(this.model);
  }),
  canPrintEnrolledMembers: computed('model.form', 'session.currentUser', function() {
    const form = this.get('model.form');
    return !isNone(form) && form.get('hasResponses') && this.isActivityOwner(this.model);
  }),
  isActivityOwner(activity) {
    const currentUser = this.get('session.currentUser');
    return !isNone(currentUser) && activity.isOwner(currentUser);
  }
});

import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canEdit: computed('session.currentUser', 'model', function() {
    return this.get('session').hasPermission('activity.update') || this.isActivityOwner(this.get('model'));
  }),
  canMailEnrolledMembers: computed('session.currentUser', 'model', function() {
    const form = this.get('model.form');
    return !isNone(form) && form.get('hasResponses') && this.isActivityOwner(this.get('model'));
  }),
  canPrintEnrolledMembers: computed.alias('canMailEnrolledMembers'),
  isActivityOwner(activity) {
    const currentUser = this.get('session.currentUser');
    return !isNone(currentUser) && activity.isOwner(currentUser);
  }
});

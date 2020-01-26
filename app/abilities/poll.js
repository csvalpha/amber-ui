import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('poll.read');
  }),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('poll.create');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('poll.destroy');
  }),
  canEdit: computed('session.currentUser', 'model', function() {
    return this.session.hasPermission('poll.update') || this.isPollOwner(this.model);
  }),
  isPollOwner(poll) {
    const currentUser = this.get('session.currentUser');
    return !isNone(currentUser) && poll.isOwner(currentUser);
  }
});

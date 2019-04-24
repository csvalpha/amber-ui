import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreate: computed('session.currentUser', function() {
    return this.get('session').hasPermission('forum/thread.create');
  }),
  canShow: computed('session.currentUser', function() {
    return this.get('session').hasPermission('forum/thread.read');
  }),
  canEdit: computed('session.currentUser', function() {
    return this.get('session').hasPermission('forum/thread.update');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.get('session').hasPermission('forum/thread.destroy');
  })
});

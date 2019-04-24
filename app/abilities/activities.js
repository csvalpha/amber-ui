import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreate: computed('session.currentUser', function() {
    return this.get('session').hasPermission('activity.create');
  }),
  canShow: computed('session.currentUser', function() {
    return this.get('session').hasPermission('activity.read');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.get('session').hasPermission('activity.destroy');
  }),
  canSelectAllGroups: computed('session.currentUser', function() {
    return this.get('session').hasPermission('activity.update');
  }),
  canShowIcal: computed('session.currentUser', function() {
    return this.get('session').hasPermission('activity.read');
  })
});

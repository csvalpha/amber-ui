import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreate: computed('session.currentUser', function() {
    return this.get('session').hasPermission('membership.create');
  }),
  canShow: computed('session.currentUser', function() {
    return this.get('session').hasPermission('membership.read');
  }),
  canUpdate: computed('session.currentUser', function() {
    return this.get('session').hasPermission('membership.update');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.get('session').hasPermission('membership.destroy');
  })
});

import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreate: computed('session.currentUser', function() {
    return this.get('session').hasPermission('static-page.create');
  }),
  canShow: true,
  canEdit: computed('session.currentUser', function() {
    return this.get('session').hasPermission('static-page.update');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.get('session').hasPermission('static-page.destroy');
  })
});

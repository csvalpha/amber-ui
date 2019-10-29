import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('group.create');
  }),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('group.read');
  }),
  // Protected fields are those fields which cannot be updated by members of group but only by members with permissions
  canEditProtectedFields: computed('session.currentUser', function() {
    return this.session.hasPermission('group.update');
  })
});

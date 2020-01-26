import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('permissions-users.create');
  }),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('permissions-users.create');
  })
});

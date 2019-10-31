import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('mail-alias.read');
  }),
  canEdit: computed('session.currentUser', function() {
    return this.session.hasPermission('mail-alias.update');
  }),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('mail-alias.create');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('mail-alias.destroy');
  })
});

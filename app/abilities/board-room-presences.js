import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('board-room-presence.read');
  }),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('board-room-presence.create');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('board-room-presence.destroy');
  })
});

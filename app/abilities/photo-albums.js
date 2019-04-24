import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: true,
  canCreate: computed('session.currentUser', function() {
    return this.get('session').hasPermission('photo-album.create');
  }),
  canEdit: computed('session.currentUser', function() {
    return this.get('session').hasPermission('photo-album.update');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.get('session').hasPermission('photo-album.destroy');
  })
});

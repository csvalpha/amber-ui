import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShowPhotoComments: computed('session.currentUser', 'model', function() {
    return this.get('session').hasPermission('photo-comment.read') || this.get('model.photoAlbum.publiclyVisible');
  })
});

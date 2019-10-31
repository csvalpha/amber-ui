import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canDestroy: computed('session.currentUser', 'model', function() {
    return this.session.hasPermission('form/response.destroy') || this.isResponseOwner(this.model);
  }),
  isResponseOwner(response) {
    return !isNone(response) && response.get('user.id') === this.get('session.currentUser.id');
  }
});

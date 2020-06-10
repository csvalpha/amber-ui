import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('form/response.read');
  }),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('form/response.create');
  }),
  canDestroy: computed('session.currentUser', 'model', function() {
    return this.session.hasPermission('form/response.destroy') || this.isResponseOwner(this.model);
  }),
  isResponseOwner(response) {
    return !isNone(response) && response.get('user.id') === this.session.currentUser.id;
  }
});

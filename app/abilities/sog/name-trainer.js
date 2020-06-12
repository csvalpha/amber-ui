import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';
import { computed } from '@ember/object';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('membership.read');
  })
});

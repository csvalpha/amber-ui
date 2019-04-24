import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed.alias('session.isAuthenticated'),
  canAccept: computed.alias('session.isAuthenticated'),
  canReject: computed.alias('session.isAuthenticated'),
  canDestroy: computed.alias('session.isAuthenticated')
});

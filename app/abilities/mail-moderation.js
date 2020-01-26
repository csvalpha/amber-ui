import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: alias('session.isAuthenticated'),
  canAccept: alias('session.isAuthenticated'),
  canReject: alias('session.isAuthenticated'),
  canDestroy: alias('session.isAuthenticated')
});

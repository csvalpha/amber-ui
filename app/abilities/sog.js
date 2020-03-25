import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';
import { alias } from '@ember/object/computed';

export default Ability.extend({
  session: service(),
  canShow: alias('session.isAuthenticated')
});

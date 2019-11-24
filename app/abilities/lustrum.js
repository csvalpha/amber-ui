import {alias} from '@ember/object/computed';
import {inject as service} from '@ember/service';
import {Ability} from 'ember-can';

export default Ability.extend({
  session: service(),
  canIndex: alias('session.isAuthenticated'),
});

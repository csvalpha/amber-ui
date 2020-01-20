import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: true
});

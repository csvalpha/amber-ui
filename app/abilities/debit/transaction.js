import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canEdit: computed('session.currentUser', function() {
    return this.session.hasPermission('debit/transaction.update');
  }),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('debit/transaction.create');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('debit/transaction.destroy');
  })
});

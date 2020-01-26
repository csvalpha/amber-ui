import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('debit/collection.read');
  }),
  canEdit: computed('session.currentUser', function() {
    return this.session.hasPermission('debit/collection.update');
  }),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('debit/collection.create');
  }),
  canDestroy: computed('session.currentUser', function() {
    return this.session.hasPermission('debit/collection.destroy');
  }),
  canDownloadSepa: computed('session.currentUser', function() {
    return this.session.hasPermission('debit/collection.create');
  })
});

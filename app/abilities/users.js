import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.session.hasPermission('user.read');
  }),
  /**
   * You can view all users if you have sufficient permissions, but each individual user can be viewed when the user can
   * view members (member of group 'Leden').
   */
  canShowIndividual: alias('session.isAuthenticated'),
  canCreate: computed('session.currentUser', function() {
    return this.session.hasPermission('user.create');
  }),
  canEditAllProperties: computed('session.currentUser', function() {
    return this.session.hasPermission('user.update') || this.session.hasPermission('user.create');
  }),
  canBatchUpload: alias('canCreate'),
  canExport: computed('session.currentUser', function() {
    return this.session.hasPermission('user.update');
  }),
  canShowWebdav: alias('session.isAuthenticated')
});

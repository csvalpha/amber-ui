import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShow: computed('session.currentUser', function() {
    return this.get('session').hasPermission('user.read');
  }),
  /**
   * You can view all users if you have sufficient permissions, but each individual user can be viewed when the user can
   * view members (member of group 'Leden').
   */
  canShowIndividual: computed.alias('session.isAuthenticated'),
  canCreate: computed('session.currentUser', function() {
    return this.get('session').hasPermission('user.create');
  }),
  canEditAllProperties: computed('session.currentUser', function() {
    return this.get('session').hasPermission('user.update') || this.get('session').hasPermission('user.create');
  }),
  canBatchUpload: computed.alias('canCreate'),
  canExport: computed('session.currentUser', function() {
    return this.get('session').hasPermission('user.update');
  }),
  canShowWebdav: computed.alias('session.isAuthenticated')
});

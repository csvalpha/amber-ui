import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShowOwn: computed.alias('session.isAuthenticated'),
  canDestroy: computed('session.currentUser', function() {
    return !this.get('isCurrentUser') && this.get('session').hasPermission('user.destroy');
  }),
  canEdit: computed('session.currentUser', function() {
    return this.get('isCurrentUser') || this.get('session').hasPermission('user.update');
  }),
  canResendActivationCode: computed('session.currentUser', function() {
    return this.get('session').hasPermission('user.create') && this.get('model.activatedAt') === null;
  }),
  isCurrentUser: computed('session.currentUser.id', 'model.id', function() {
    return this.get('model.id') === this.get('session.currentUser.id');
  })
});

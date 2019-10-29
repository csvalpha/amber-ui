import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: service(),
  canShowOwn: alias('session.isAuthenticated'),
  canDestroy: computed('session.currentUser', function() {
    return !this.isCurrentUser && this.session.hasPermission('user.destroy');
  }),
  canEdit: computed('session.currentUser', function() {
    return this.isCurrentUser || this.session.hasPermission('user.update');
  }),
  canResendActivationCode: computed('session.currentUser', function() {
    return this.session.hasPermission('user.create') && this.get('model.activatedAt') === null;
  }),
  isCurrentUser: computed('session.currentUser.id', 'model.id', function() {
    return this.get('model.id') === this.get('session.currentUser.id');
  })
});

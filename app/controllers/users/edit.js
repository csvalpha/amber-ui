import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import EditController from 'alpha-amber/controllers/application/edit';
import { DigtusSubscriptionPreferenceTypes, AlmanakSubscriptionPreferenceTypes } from 'alpha-amber/constants';

export default EditController.extend({
  session: service(),
  ajax: service(),
  flashNotice: service(),
  successMessage: 'Gegevens gewijzigd!',
  successTransitionTarget: 'users.show',
  canEditOnlyOwnProperties: computed('session.currentUser', function() {
    return !this.get('session').hasPermission('user.update') && !this.get('session').hasPermission('user.create');
  }),
  digtusSubscriptionPreferenceTypes: computed(() => {
    return Object.entries(DigtusSubscriptionPreferenceTypes).map(([value, label]) => ({ value, label }));
  }),
  almanakSubscriptionPreferenceTypes: computed(() => {
    return Object.entries(AlmanakSubscriptionPreferenceTypes).map(([value, label]) => ({ value, label }));
  }),
  isOwnUser: computed('session.currentUser', 'model', function() {
    return this.get('model') === this.get('session.currentUser');
  }),
  actions: {
    fileLoaded(file) {
      const user = this.get('model');
      user.set('avatar', file.data);
    }
  }
});

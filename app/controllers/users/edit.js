import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import EditController from 'alpha-amber/controllers/application/edit';
import {
  DigtusSubscriptionPreferenceTypes,
  AlmanakSubscriptionPreferenceTypes,
} from 'alpha-amber/constants';

export default EditController.extend({
  session: service(),
  flashNotice: service(),
  successMessage: 'Gegevens gewijzigd!',
  successTransitionTarget: 'users.show',
  canEditOnlyOwnProperties: computed('session.currentUser', function () {
    return (
      !this.session.hasPermission('user.update') &&
      !this.session.hasPermission('user.create')
    );
  }),
  digtusSubscriptionPreferenceTypes: computed(function () {
    return Object.entries(DigtusSubscriptionPreferenceTypes).map(
      ([value, label]) => ({ value, label })
    );
  }),
  almanakSubscriptionPreferenceTypes: computed(function () {
    return Object.entries(AlmanakSubscriptionPreferenceTypes).map(
      ([value, label]) => ({ value, label })
    );
  }),
  isOwnUser: computed('session.currentUser', 'model', function () {
    return this.model === this.session.currentUser;
  }),
  actions: {
    fileLoaded(file) {
      const user = this.model;
      user.set('avatar', file.data);
    },
  },
});

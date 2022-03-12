// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import {
  DigtusSubscriptionPreferenceTypes,
  AlmanakSubscriptionPreferenceTypes,
} from 'alpha-amber/constants';
import EditController from 'alpha-amber/controllers/application/edit';
import { inject as service } from '@ember/service';

export default class EditUserController extends EditController {
  @service session;
  @service('flash-notice') flashNotice;

  successMessage = 'Gegevens gewijzigd!';
  successTransitionTarget = 'users.show';

  @computed('session.currentUser', function() {
    return !this.session.hasPermission('user.update') && !this.session.hasPermission('user.create');
  })
  canEditOnlyOwnProperties;

  @computed(function() {
    return Object.entries(DigtusSubscriptionPreferenceTypes).map(([value, label]) => ({ value, label }));
  })
  digtusSubscriptionPreferenceTypes;

  @computed(function() {
    return Object.entries(AlmanakSubscriptionPreferenceTypes).map(([value, label]) => ({ value, label }));
  })
  almanakSubscriptionPreferenceTypes;

  @computed('session.currentUser', 'model', function() {
    return this.model === this.session.currentUser;
  })
  isOwnUser;

  @action
  fileLoaded(file) {
    const user = this.model;
    user.set('avatar', file.data);
  }
}

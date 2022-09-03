// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { action, computed } from '@ember/object';
import {
  DigtusSubscriptionPreferenceTypes,
  AlmanakSubscriptionPreferenceTypes,
} from 'amber-ui/constants';
import EditController from 'amber-ui/controllers/application/edit';
import { inject as service } from '@ember/service';

export default class EditUserController extends EditController {
  @service session;

  successMessage = 'Gegevens gewijzigd!';
  successTransitionTarget = 'users.show';

  get canEditOnlyOwnProperties() {
    return (
      !this.session.hasPermission('user.update') &&
      !this.session.hasPermission('user.create')
    );
  }

  get digtusSubscriptionPreferenceTypes() {
    return Object.entries(DigtusSubscriptionPreferenceTypes).map(
      ([value, label]) => ({ value, label })
    );
  }

  get almanakSubscriptionPreferenceTypes() {
    return Object.entries(AlmanakSubscriptionPreferenceTypes).map(
      ([value, label]) => ({ value, label })
    );
  }

  get isOwnUser() {
    return this.model === this.session.currentUser;
  }

  @action
  fileLoaded(file) {
    const user = this.model;
    user.set('avatar', file.data);
  }
}

import {
  DigtusSubscriptionPreferenceTypes,
  AlmanakSubscriptionPreferenceTypes,
} from 'amber-ui/constants';
import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditIndexController extends EditController {
  @service session;

  successMessage = 'Gegevens gewijzigd!';
  successTransitionTarget = 'users.user';

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

import {
  PicturePublicationPreferenceTypes,
  UserDetailsPreferenceTypes,
} from 'amber-ui/constants';
import Component from '@glimmer/component';
import ModelSaveUtil from 'amber-ui/utils/model-save';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class PrivacySettingsComponent extends Component {
  @service flashNotice;
  @service session;

  @tracked errorMessage = null;

  successMessage = 'Privacyinstellingen gewijzigd!';
  successTransitionTarget = null;
  get successTransitionModel() {
    return null;
  }

  formActionsVisible = true;

  constructor() {
    super(...arguments);
    this.modelSaveUtil = new ModelSaveUtil(this);
  }

  get picturePublicationPreferenceTypes() {
    return Object.entries(PicturePublicationPreferenceTypes).map(
      ([value, label]) => ({ value, label })
    );
  }

  get userDetailsPreferenceTypes() {
    return Object.entries(UserDetailsPreferenceTypes).map(([value, label]) => ({
      value,
      label,
    }));
  }

  get isOwnUser() {
    return this.args.model === this.session.currentUser;
  }

  get canChangeSofiaSettings() {
    return (
      !isPresent(this.args.model.changedAttributes().allowSofiaSharing) &&
      this.args.model.allowSofiaSharing
    );
  }
}

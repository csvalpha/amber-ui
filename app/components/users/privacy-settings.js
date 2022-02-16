import {
  PicturePublicationPreferenceTypes,
  UserDetailsPreferenceTypes,
} from 'alpha-amber/constants';
import Component from '@glimmer/component';
import ModelSaveUtil from 'alpha-amber/utils/model-save';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class PrivacySettingsComponent extends Component {
  @service('flash-notice') flashNotice;
  @service session;

  @tracked errorMessage = null;

  successMessage = 'Privacyinstellingen gewijzigd!';
  successTransitionTarget = null;
  successTransitionModel = null;
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

  get canChangeTomatoSettings() {
    return (
      !isPresent(this.args.model.changedAttributes().allowTomatoSharing) &&
      this.args.model.allowTomatoSharing
    );
  }

  @action
  submit() {
    this.modelSaveUtil.saveModel(this.args.model);
  }
}

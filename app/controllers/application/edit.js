import Controller from '@ember/controller';
import ModelSaveUtil from 'amber-ui/utils/model-save';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EditController extends Controller {
  @service flashNotice;

  @tracked errorMessage = null;
  successMessage = 'Wijzigen gelukt!';
  cancelMessage = 'Wijzigen geannuleerd.';
  @tracked successTransitionTarget = null;
  @tracked cancelTransitionTarget = this.successTransitionTarget; // sensible default
  get successTransitionModel() {
    return this.model;
  }

  get cancelTransitionModel() {
    return this.successTransitionModel;
  }

  constructor() {
    super(...arguments);
    this.modelSaveUtil = new ModelSaveUtil(this);
  }

  @action
  submit() {
    this.modelSaveUtil.saveModel(this.model);
  }

  onError(error) {
    // todo: somehow incorporate the error into the message maybe? could be useful if users can show us the error message
    this.errorMessage =
      'Er ging iets fout bij het opslaan van je wijzigingen. ' + error;
  }

  @action
  cancel() {
    this.modelSaveUtil.cancelEdit();
  }
}

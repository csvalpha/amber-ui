import Controller from '@ember/controller';
import ModelSaveUtil from 'amber-ui/utils/model-save';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EditController extends Controller {
  @service flashNotice;

  @tracked errorMessage = null;
  @tracked successTransitionTarget = null;
  @tracked cancelTransitionTarget = this.successTransitionTarget; // sensible default

  successMessage = 'Wijzigen gelukt!';
  cancelMessage = 'Wijzigen geannuleerd.';

  constructor() {
    super(...arguments);
    this.modelSaveUtil = new ModelSaveUtil(this);
  }

  get successTransitionModel() {
    return this.model;
  }

  get cancelTransitionModel() {
    return this.successTransitionModel;
  }

  @action
  submit() {
    this.modelSaveUtil.saveModel(this.model);
  }

  @action
  cancel() {
    this.modelSaveUtil.cancelEdit();
  }

  onError(error) {
    // TODO: somehow incorporate the error into the message maybe? could be
    //  useful if users can show us the error message
    this.errorMessage =
      'Er ging iets fout bij het opslaan van je wijzigingen. ' + error;
  }
}

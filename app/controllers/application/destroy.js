import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';
import {tracked} from '@glimmer/tracking';


export default class DestroyController extends EditController {
  successMessage = 'Verwijderen gelukt!';
  cancelMessage = 'Verwijderen geannuleerd.';
  @tracked successTransitionModel = null;
  @tracked cancelTransitionTarget = null;
  @tracked cancelTransitionModel = this.model;

  @action
  destroyModel() {
    this.modelSaveUtil.destroyModel(this.model);
  }

  onError(error) {
    // todo: somehow incorporate the error into the message maybe? could be useful if users can show us the error message
    this.errorMessage = 'Er ging iets fout bij het verwijderen.'
    this.errorMessage += error
  }

  transition() {
    this.replaceRoute(...arguments)
  }

  submit = undefined;

}

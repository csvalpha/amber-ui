import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';


export default class DestroyController extends EditController {
  successMessage = 'Verwijderen gelukt!';

  @action
  destroyModel() {
    console.log('destroying shit')
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

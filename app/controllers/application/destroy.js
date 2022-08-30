import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';


export default class DestroyController extends EditController {
  successMessage = 'Verwijderen gelukt!';

  @action
  destroyModel() {
    console.log('destroying shit')
    this.modelSaveUtil.destroyModel(this.model);
  }

  submit = undefined;

}

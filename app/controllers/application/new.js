import EditController from 'amber-ui/controllers/application/edit';
import { action } from '@ember/object';

export default class NewController extends EditController {
  successMessage = 'Aanmaken gelukt!';
  onSuccess(model) {
    model.reload();
    this.modelSaveUtil.redirect(model);
  }
}
